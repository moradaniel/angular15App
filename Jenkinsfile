pipeline {
    agent any
    stages{
        stage ('Git'){
          steps{
            git branch:'master', url:'https://github.com/moradaniel/angular15App'
          }
        }

        stage('Build docker image'){
          steps{
                script{
                    sh 'docker build -f Dockerfile . -t angular15-app:1.0.002'
                }
            }
        }

        stage('List pods') {
          steps {
            echo '## Starting Kubernetes deployment ##'
            withKubeConfig([credentialsId: 'minikubeconfig']) {
              sh 'curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"'
              sh 'chmod u+x ./kubectl'
              sh './kubectl apply -f kubernetes/k8s-configmap.yaml'
              sh './kubectl apply -f kubernetes/deployment.yaml'
              sh './kubectl apply -f kubernetes/service.yaml'
            }
          }
        }
    }
}
