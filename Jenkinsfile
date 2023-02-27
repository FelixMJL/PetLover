pipeline {
    agent any

    environment{
        AWS_CRED        = 'AWS' 
        AWS_REGION      = 'ap-southeast-2'
        S3_BUCKET       = 'petlover-uat'
        CLOUDFRONT_DISTRIBUTION_ID = 'E3CDPG27R6NV4H'
    }

    stages{
        stage('Install dependency')
        {
            steps{
             echo "Installing packages"
             sh 'npm install'
            }          
        }

        stage('npm build') 
        {
            steps{
             echo "Building compressed files..."
             sh " npm run build"
             sh 'ls -la ./build'
            }
        } 

        stage('upload  to  S3 bucket production and revalidate CDN Cache') {
            // develop
            when {branch 'Suree/DevOps'}   
            steps {
                withAWS(credentials: AWS_CRED, region: AWS_REGION){
                    dir('./build') {
                        echo "deploy static files to S3"
                        sh "aws s3 sync . s3://${S3_BUCKET_NAME} --delete"
                        sh "aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths '/*'"
                    }
                }
            }
        }
    }
}