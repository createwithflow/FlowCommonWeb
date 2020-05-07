pipeline {
    agent any
    stages {
        stage('Lint java script files') {
            steps {
                sh 'ruby --version'
                sh 'npm --version'
                sh 'npm install'
                sh 'npm install eslint -g'
                sh 'eslint --version'
                sh './ESLintFlowCommon.rb'
            }
        }
    }
}