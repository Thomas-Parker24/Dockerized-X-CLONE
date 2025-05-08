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

    stage('Login to Azure') {
      steps {
        script {
          echo 'Please login to Azure interactively...'
          if (isUnix()) {
            sh 'az login' // Este comando abrirá una ventana para iniciar sesión
          } else {
            bat 'az login' // Lo mismo en Windows
          }
        }
      }
    }

    stage('Shutting Off Infrastructure') {
      steps {
        script {
          if (isUnix()) {
            sh '''
              ls -la
              C:\\Terraform\\terraform.exe init
              C:\\Terraform\\terraform.exe destroy -auto-approve
            '''
          } else {
            bat '''
              C:\\Terraform\\terraform.exe init
              C:\\Terraform\\terraform.exe destroy -auto-approve
            '''
          }
        }
      }
    }

    stage('Turning On Infrastructure') {
      steps {
        script {
          if (isUnix()) {
            sh '''
              ls -la
              C:\\Terraform\\terraform.exe init
              C:\\Terraform\\terraform.exe plan -out=tfplan
              C:\\Terraform\\terraform.exe apply -auto-approve tfplan
            '''
          } else {
            bat '''
              C:\\Terraform\\terraform.exe init
              C:\\Terraform\\terraform.exe plan -out=tfplan
              C:\\Terraform\\terraform.exe apply -auto-approve tfplan
            '''
          }
        }
      }
    }

  }
}
