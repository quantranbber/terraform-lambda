data "archive_file" "zip_app" {
  type = "zip"

  source_dir  = "../.webpack"
  output_path = "app.zip"
}

resource "aws_s3_bucket" "lambda_bucket" {
  bucket = "${var.project_name}-deployment-bucket"
  tags   = var.resource_tags
}

resource "aws_s3_object" "lambda_zip_file" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "/backend/app.zip"
  source = data.archive_file.zip_app.output_path

  etag = filemd5(data.archive_file.zip_app.output_path)
}

resource "aws_db_instance" "rds_instance" {
  identifier           = "${var.project_name}-rds-instance"
  allocated_storage    = 20
  engine               = "postgres"
  engine_version       = "14.7"
  instance_class       = "db.t3.micro"
  username             = "vti_dev"
  password             = "Vti12345"
  parameter_group_name = "default.postgres14"
  publicly_accessible  = true
  multi_az             = false

  tags = var.resource_tags

  provisioner "local-exec" {
    command = <<EOF
    # Wait for the RDS instance to be available
    sleep 60

    # Connect to the RDS instance and create the initial database
    psql --host=${aws_db_instance.rds_instance.address} --port=${aws_db_instance.rds_instance.port} --username=${aws_db_instance.rds_instance.username} --dbname=postgres --command="CREATE DATABASE ${var.db_name};"
    EOF
  }
}

resource "aws_lambda_function" "app" {
  function_name = "${var.project_name}_lambda_function"
  role          = aws_iam_role.lambdaRole.arn
  s3_bucket     = aws_s3_bucket.lambda_bucket.id
  s3_key        = aws_s3_object.lambda_zip_file.key
  handler       = "app.handler"
  runtime       = "nodejs16.x"
  timeout       = 30
  memory_size   = 512

  environment {
    variables = {
      DB_HOST     = aws_db_instance.rds_instance.address
      DB_PORT     = 5432
      DB_USERNAME = aws_db_instance.rds_instance.username
      DB_PASSWORD = aws_db_instance.rds_instance.password
      DB_DATABASE = var.db_name
      DB_SCHEMA   = "public"
    }
  }
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name = "/aws/lambda/${aws_lambda_function.app.function_name}"

  retention_in_days = 30
}