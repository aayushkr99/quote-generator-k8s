pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-cred')
        DOCKER_HUB_USERNAME = "${DOCKER_HUB_CREDENTIALS_USR}"
        KUBECONFIG_CREDENTIALS = credentials('k8s-cred')
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
        // stage('Deploy to Kubernetes') {
        //     steps {
        //         withCredentials([file(credentialsId: 'k8s-cred', variable: 'KUBECONFIG')]) {
        //             sh '''
        //             kubectl apply -f k8s/deployment.yaml
        //             kubectl apply -f k8s/service.yaml
        //             '''
        //         }
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

        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'k8s-cred', variable: 'KUBECONFIG')]) {
                    sh '''
                    kubectl apply -f k8s/deployment.yaml -n my-namespace
                    kubectl apply -f k8s/service.yaml -n my-namespace
                    '''
                }
            }
        }
    }
}
// def kubectlApply() {
//     sh '''
//     kubectl apply -f k8s/configmap.yaml
//     kubectl apply -f k8s/secret.yaml
//     kubectl apply -f k8s/deployment.yaml
//     kubectl apply -f k8s/service.yaml
//     kubectl apply -f k8s/ingress.yaml
//     '''
// }



