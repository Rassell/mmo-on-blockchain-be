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

resource "google_cloudfunctions_function" "function" {
  name        = "func-arena"
  description = "My function"
  runtime     = "nodejs16"

  available_memory_mb   = 128
  trigger_http          = true
  entry_point           = "helloHttp"

  source_repository {
    url = "https://github.com/Rassell/mmo-on-blockchain-be/tree/main/functions/arena"
  }
}

# IAM entry for all users to invoke the function
resource "google_cloudfunctions_function_iam_member" "invoker" {
  project        = google_cloudfunctions_function.function.project
  region         = google_cloudfunctions_function.function.region
  cloud_function = google_cloudfunctions_function.function.name

  role   = "roles/cloudfunctions.invoker"
  member = "allUsers"
}
