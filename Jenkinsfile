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


        stage('List pods') {
            withKubeConfig([credentialsId: 'minikubeconfig']) {
              sh 'kubectl get pods'
            }
          }
    }
}
