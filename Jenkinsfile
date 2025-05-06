pipeline {
  agent any

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
