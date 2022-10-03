variable "aws_account_id" {
  default = 481820811007
}

variable "aws_region" {
  default = "us-west-2"
}

variable "ecr_repository_name" {
  default     = "home-test"
}

variable "ecr_release_tag" {
  default = "latest"
}

variable "service_name" {
  default     = "home-test"
}
variable "service_port" {
  default     = "8000"
}
variable "mysql_db_name" {
  default     = "hometest_db"
}
variable "mysql_username" {
  default     = "admin"
}
variable "mysql_password" {
  default     = "P1pfyUy5X1wtmMCSo"
}