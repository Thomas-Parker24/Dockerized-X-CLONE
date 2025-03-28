pipeline{
  agent any

  stages{
    stage ('Install dependencies'){
      steps{
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
    stage ('Run Jest Tests'){
      steps{
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
    stage ('Down containers'){
      steps{
        script {
            if (isUnix()) {
               sh 'docker compose down -v'
            } else {
                bat 'docker compose down -v'
            }
        }
      }
    }
    stage('Build and up containers'){
      steps{
        script{
          if (isUnix()) {
            sh 'docker compose up --build -d'
          } else {
            bat 'docker compose up --build -d'
          }
        }
      }
    }
  }
}