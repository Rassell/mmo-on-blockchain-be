provider "google" {
  project = "mmo-on-blockchain"
  region  = "europe-west1"
  zone    = "europe-west1-b"
}

terraform {
  backend "gcs" {
    bucket = "tf-state-omn-prd"
    prefix = "terraform/state"
  }
}

resource "google_storage_bucket" "bucket" {
  name     = "mmo-on-blockchain-bucket"
  location = "EU"
}

data "archive_file" "dummy" {
  type        = "zip"
  output_path = "${path.module}/lambda_function_payload.zip"

  source {
    content  = "hello"
    filename = "dummy.txt"
  }
}

resource "google_storage_bucket_object" "archive" {
  name   = data.archive_file.dummy.output_name
  bucket = google_storage_bucket.bucket.name
  source = data.archive_file.dummy.output_path
}

resource "google_cloudfunctions_function" "function" {
  name        = "func-arena"
  description = "My function"
  runtime     = "nodejs16"

  available_memory_mb   = 128
  source_archive_bucket = google_storage_bucket.bucket.name
  source_archive_object = google_storage_bucket_object.archive.name
  trigger_http          = true
  entry_point           = "helloHttp"
}

# IAM entry for all users to invoke the function
resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = google_cloudfunctions_function.function.project
  region         = google_cloudfunctions_function.function.region
  cloud_function = google_cloudfunctions_function.function.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}
