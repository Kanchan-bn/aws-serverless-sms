# aws-serverless-sms
Lambda function triggered on S3 event
The function is integrated with twilio to send SMS when file is uploaded to S3 bucket

# Assumption
1. File upload to the S3 bucket is out of scope
2. S3 bucket for file upload already exists
3. AWS credentials are available to use
4. Twilio account has been created

# Design
## Part 1 : Detecting the file upload

### Solution: 
1. Triggering lambda function on S3 events
2. Lambda function is able to read the event and process the event further

### Investigation
1. Found that there are 3 ways to create lambda functions - AWS CLI, Serverless framework, AWS SAM (Serverless Application Model)
2. Created prototypes in all three ways
3. Based on further reading, decided to use Serverless framework

## Part 2: Sending SMS

### Solution:
1. Created code separate from the lambda handler to handle Twilio integration to separate concerns
2. A separate method can also be unit tested independently
3. The Twilio credentials are all configured as Env variables so they can be changed if needed without having to redeploy 
- Env variables on the Lambda console override programmatic Env variables

#### Note
1. Environment variables are being used for ease of testing for this project and should not be used in production. .env files should not be present in the repo.
2. Environment variables in the .dev.env file use test credentials and donot send a real SMS
3. Env variables can be overridden in the lambda console on AWS. 
  * For example, "To number" can be changed for testing
4. S3 bucket name used: operata-logfile-bucket
5. Trigger is manually created on the S3 bucket after the function is deployed

# Testing
1. The handler and Twilio integration can be separately tested. The handler tests the entire functionality - integration
2. Initially the code was tested with test credentials from Twilio which don't send an actual SMS hence not wasting the credit on the account.
3. Console logging was used to check the output and to make sure the rest of the code was working correctly.
4. Could not write more tests due to time constraints but some of the potential testing scenarios are:
  * different event records
  * different numbers (using test scenarios mentioned on Twilio site https://www.twilio.com/docs/iam/test-credentials)

# Deployment/ Automation
1. To run Github Action when master branch is pushed
2. The Github Action runs tests before deploying to AWS
3. AWS credentials are stored securely on Github for deployment.
4. Chose Github Action because it was the easiest to implement. Didn't get time to investigate other options

# Operational support
1. Since the Twilio credentials need to be saved securely they need to be configured as Env variables in Lambda console where more security measures can be taken to secure them
(https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html#configuration-envvars-encryption)
There will be an effort involved everytime the "To Number" or credentials themselves need to be changed
2. Manual setting up of Trigger on the S3 bucket

# Issues encountered
1. Kept getting stuck at yml and had to figure out how to write it properly :)
2. Not issue but spent time upskilling and learning AWS ecosystem and the different ways to create Lambda. There were some trial and error issues invovled.

# Thoughts
## Testing real From and To numbers:
* The Env variables on AWS Lambda console always override any that were deployed programmatically and there is no way to verify they are valid.
* Idea: These two numbers could always be used as constants in the code and used in test cases that are run before deployment. To make sure invalid phone numbers are not used.
* Problem: Need redeploy everytime there is a need to change numbers


