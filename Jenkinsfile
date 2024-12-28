// pipeline {
//     agent any

//     // triggers {
//     //     // Trigger pipeline on changes pushed to the GitHub repository
//     //     pollSCM('H/5 * * * *') // Polls the repository every 5 minutes
//     // }

//     stages {
//         stage('Checkout') {
//             steps {
//                 echo 'Checking out code from GitHub...'
//                 checkout scm
//             }
//         }
//         stage('Build') {
//             steps {
//                 echo 'Building the application...'
//                 // Add your build commands here
//                 sh 'echo Build stage running'
//             }
//         }
//         stage('Test') {
//             steps {
//                 echo 'Running tests...'
//                 // Add your test commands here
//                 sh 'echo Test stage running'
//             }
//         }
//     }
//     post {
//         always {
//             echo 'Pipeline finished.'
//         }
//     }
// }


pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-cred')
        DOCKER_HUB_USERNAME = "${DOCKER_HUB_CREDENTIALS_USR}"
    }
    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/aayushkr99/quote-generator-k8s.git'
            }
        }
        stage('Build Backend') {
            when {
                changeset "backend/**"
            }
            steps {
                dir('backend') {
                    sh 'docker build -t ${DOCKER_HUB_USERNAME}/backend:latest .'
                }
            }
        }
        stage('Push Backend') {
            when {
                changeset "backend/**"
            }
            steps {
                withDockerRegistry([credentialsId: 'docker-cred', url: '']) {
                    sh 'docker push ${DOCKER_HUB_USERNAME}/backend:latest'
                }
            }
        }
        // stage('Deploy Backend to Kubernetes') {
        //     when {
        //         changeset "backend/**"
        //     }
        //     steps {
        //         sh 'kubectl apply -f k8s/'
        //     }
        // }
        stage('Build Frontend') {
            when {
                changeset "frontend/**"
            }
            steps {
                dir('frontend') {
                    sh 'docker build -t ${DOCKER_HUB_USERNAME}/frontend:latest .'
                }
            }
        }
        stage('Push Frontend') {
            when {
                changeset "frontend/**"
            }
            steps {
                withDockerRegistry([credentialsId: 'docker-cred', url: '']) {
                    sh 'docker push ${DOCKER_HUB_USERNAME}/frontend:latest'
                }
            }
        }
        // stage('Deploy Frontend to Kubernetes') {
        //     when {
        //         changeset "frontend/**"
        //     }
        //     steps {
        //         sh 'kubectl apply -f k8s/'
        //     }
        // }
    }
}

// pipeline {
//     agent any
//     environment {
//         DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
//     }
//     stages {
//         stage('Checkout Code') {
//             steps {
//                 git 'https://github.com/your-repo.git'
//             }
//         }
//         stage('Build Docker Images') {
//             steps {
//                 sh 'docker build -t your-dockerhub-username/backend:latest ./backend'
//                 sh 'docker build -t your-dockerhub-username/frontend:latest ./frontend'
//             }
//         }
//         stage('Push to Docker Hub') {
//             steps {
//                 sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
//                 sh 'docker push your-dockerhub-username/backend:latest'
//                 sh 'docker push your-dockerhub-username/frontend:latest'
//             }
//         }
//         stage('Deploy to Kubernetes') {
//             steps {
//                 kubectlApply()
//             }
//         }
//     }
// }

// def kubectlApply() {
//     sh '''
//     kubectl apply -f k8s/configmap.yaml
//     kubectl apply -f k8s/secret.yaml
//     kubectl apply -f k8s/deployment.yaml
//     kubectl apply -f k8s/service.yaml
//     kubectl apply -f k8s/ingress.yaml
//     '''
// }



