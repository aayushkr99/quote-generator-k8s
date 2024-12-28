pipeline {
    agent any

    // triggers {
    //     // Trigger pipeline on changes pushed to the GitHub repository
    //     pollSCM('H/5 * * * *') // Polls the repository every 5 minutes
    // }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code from GitHub...'
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Building the application...'
                // Add your build commands here
                sh 'echo Build stage running'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                // Add your test commands here
                sh 'echo Test stage running'
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
