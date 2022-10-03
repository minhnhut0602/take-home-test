locals {
   ecr_repository_name = var.ecr_repository_name
   service_name        = var.service_name
   service_port        = var.service_port
   service_release_tag = "latest"
}

data "aws_caller_identity" "current" {}

data "aws_region" "current" {}

resource "aws_db_instance" "rds_instance" {
   allocated_storage = 20
   identifier = "rds-home-test"
   storage_type = "gp2"
   engine = "mysql"
   engine_version = "8.0.27"
   instance_class = "db.t2.micro"
   db_name = var.mysql_db_name
   username = var.mysql_username
   password = var.mysql_password
   publicly_accessible    = true
   skip_final_snapshot    = true

   tags = {
      Name = "HomeTestRDSServerInstance"
   }
}

resource "aws_ecr_repository" "ecr_repository" {
   name = local.ecr_repository_name
   image_scanning_configuration {
      scan_on_push = true
   }
}

resource "null_resource" "docker_build" {

   triggers = {
      always_run = "${timestamp()}"
   }

   provisioner "local-exec" {
      command = <<EOT
      docker build -t ${var.ecr_repository_name}:${var.ecr_release_tag} .
      docker tag ${var.ecr_repository_name}:${var.ecr_release_tag} ${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/${var.ecr_repository_name}:${var.ecr_release_tag}
      aws ecr get-login-password --region ${var.aws_region} | docker login --username AWS --password-stdin ${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com
      docker push ${var.aws_account_id}.dkr.ecr.${var.aws_region}.amazonaws.com/${var.ecr_repository_name}:${var.ecr_release_tag}
      EOT
   }
}

resource "aws_ecr_lifecycle_policy" "ecr_lifecycle_policy" {
   repository = aws_ecr_repository.ecr_repository.name
   policy     = jsonencode({
      "rules" : [
         {
            "rulePriority" : 1,
            "description" : "Expire untagged images older than 14 days",
            "selection" : {
               "tagStatus" : "untagged",
               "countType" : "sinceImagePushed",
               "countUnit" : "days",
               "countNumber" : 14
            },
            "action" : {
               "type" : "expire"
            }
         }
      ]
   })
}

resource "aws_iam_role" "runner_role" {
   name               = "${local.service_name}-role"
   assume_role_policy = jsonencode({
      Version   = "2012-10-17"
      Statement = [
         {
            Action    = "sts:AssumeRole"
            Effect    = "Allow"
            Principal = {
               Service = "build.apprunner.amazonaws.com"
            }
         }
      ]
   })
}

resource "time_sleep" "waitrolecreate" {
   depends_on = [aws_iam_role.runner_role]
   create_duration = "60s"
}

resource "aws_iam_role_policy_attachment" "runner_role_policy_attachment" {
   role       = aws_iam_role.runner_role.name
   policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess"
}

resource "time_sleep" "waitrolecreate2" {
   depends_on = [aws_iam_role_policy_attachment.runner_role_policy_attachment]
   create_duration = "60s"
}

resource "aws_apprunner_service" "runner_service" {
   depends_on = [time_sleep.waitrolecreate2]

   service_name = local.service_name
   source_configuration {
      authentication_configuration {
         access_role_arn = aws_iam_role.runner_role.arn
      }
      image_repository {
         image_identifier      = "${aws_ecr_repository.ecr_repository.repository_url}:${local.service_release_tag}"
         image_repository_type = "ECR"
         image_configuration {
            port = local.service_port
         }
      }
   }
}

output "service_url" {
   value = aws_apprunner_service.runner_service.service_url
}