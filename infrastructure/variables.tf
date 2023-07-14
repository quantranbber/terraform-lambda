variable "project_name" {
  type    = string
  default = "prjabcd"
}

variable "db_name" {
  type    = string
  default = "mydatabase"
}

variable "resource_tags" {
  description = "Tags to set for all resources"
  type        = map(string)
  default = {
    project     = "prj_abcd"
    environment = "dev"
  }
}