#!/bin/bash -x
cp .env.sample .env
terraform init
terraform apply