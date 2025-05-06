pipeline {
  agent any
  
  environment {
    ARM_SUBSCRIPTION_ID  = "6a85bb25-6ff1-44ee-ac00-67c96236e70d"
    ARM_TENANT_ID        = "ca3f1d6b-fd1f-40b1-b41a-488b980e9f7f"
  }

  stages {
    stage ('Install dependencies') {
      steps {
        echo 'Starting installing dependencies...'
        script {
          if (isUnix()) {
            sh 'cd X-CLONE- && npm install'
          } else {
            bat 'cd X-CLONE- && npm install'
          }
        }
      }
    }

    stage ('Run Jest Tests') {
      steps {
        echo 'Starting running jest unit tests'
        script {
          if (isUnix()) {
            sh 'cd X-CLONE- && npm run test'
          } else {
            bat 'cd X-CLONE- && npm run test'
          }
        }
      }
    }

    stage('Validating Terraform Plan') {
      steps {
        script {
          if (isUnix()) {
            sh '''
              ls -la
              terraform init
              terraform plan -out=tfplan
              terraform apply -auto-approve tfplan
            '''
          } else {
            bat '''
              terraform init
              terraform plan -out=tfplan
              terraform apply -auto-approve tfplan
            '''
          }
        }
      }
    }

  }
}
