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
        stage('Minify files') {
            steps {
                sh 'npm i uglify-js-es6 -g'
                sh 'uglifyjs --version'
                sh './minify.rb'
            }
        }

    }
}
