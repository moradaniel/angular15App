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
                    sh 'docker build -f Dockerfile . -t angular15-app:1.0'
                }
            }
        }

        stage('Deploy to k8s'){
            steps{
                script{
                    kubernetesDeploy (configs: "kubernetes/k8s-configmap.yaml", "kubernetes/deployment.yaml", "kubernetes/service.yaml" )
                }
            }
        }
    }
}
