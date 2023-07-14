#!/bin/bash

declare -A stages=(
    ["dev"]="dev"
)

sed \
    -e "s#DB_HOST=.*#DB_HOST=${DB_HOST}#" \
    -e "s#DB_PORT=.*#DB_PORT=${DB_PORT}#" \
    -e "s#DB_USERNAME=.*#DB_USERNAME=${DB_USERNAME}#" \
    -e "s#DB_PASSWORD=.*#DB_PASSWORD=${DB_PASSWORD}#" \
    -e "s#DB_DATABASE=.*#DB_DATABASE=${DB_DATABASE}#" \
    -e "s#DB_SCHEMA=.*#DB_SCHEMA=${DB_SCHEMA}#" \
    -e "s#S3_BUCKET_NAME=.*#S3_BUCKET_NAME=${S3_BUCKET_NAME}#" \
    sample.env > .env.${1}


