## Steps to run the Project

## Video URL - [https://youtu.be/wqvAcT-hsHQ](https://youtu.be/wqvAcT-hsHQ)

Make sure you have [Nodejs 10](https://nodejs.org/en/download/) and [Serverless Framework Library](https://serverless.com/framework/) installed in your system.

  1. Extract the provided zip file and navigate to the root directory.
  2. As given in the [documentation here](https://serverless.com/framework/docs/providers/aws/guide/credentials#create-an-iam-user-and-access-key), create an IAM User and Access Key from the [AWS console](https://console.aws.amazon.com/iam/home?region=us-east-1#/users). 
  3. Note the Access Key and Secret Key generated and use it to setup serverless function using any of the methods given [here](https://serverless.com/framework/docs/providers/aws/guide/credentials#using-aws-access-keys).
  4. Run the command `npm install` to install all the dependencies from `package.json` file.
  5. Run the command `serverless` and setup your IAM account.
  6. Run the command `serverless login` to make sure that you have logged in to your serverless account.
  7. Run the command `serverless deploy` to deploy the project.
  I have used the default us-east-1 server location for this project. It can be changed from the `serverless.yml` file.
  8. Once the function is deployed, you will get the 2 endpoints on the terminal:
    * /create: To create an event to be executed at a specific time. A sample curl:
        ```curl -X POST \
            https://ru7grj5586.execute-api.us-east-1.amazonaws.com/dev/create \
            -H 'Cache-Control: no-cache' \
            -H 'Content-Type: application/json' \
            -H 'Postman-Token: 2cb3d16a-b022-ce2b-f075-ec47148d6cb9' \
            -d '{
            "method": "POST",
            "url": "https://jsonplaceholder.typicode.com/posts/1",
            "payload": "{'\''text'\'':'\''data'\''}",
            "headers": "",
            "execution_time": "2019-09-26T22:16:00Z"
            }'
        ```
    * /list: To view all the Events stored in Database. A sample curl:
        ```
        curl -X GET \
        https://ru7grj5586.execute-api.us-east-1.amazonaws.com/dev/list \
        -H 'Cache-Control: no-cache' \
        -H 'Content-Type: application/json' \
        -H 'Postman-Token: 0229c5de-caa1-c3a1-a784-a46221f39dc0'
        ```
  9. You can also run the script provided as `./script.sh` my making necessary changes in the Endpoints.
  10. You can check the Logs by visiting the Lambda Function or Step Function on the AWS console.

P.S.: A problem that might occur sometimes in Windows. If the operation of Step 7 - `serverless deploy` stops at:
```
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Installing dependencies for custom CloudFormation resources...
```

Then open the `serverless.yml` file and check if the file starts with:
```
org: <your_id>
app: topcoder-autopilot-serverless
```

Delete these 2 lines and run `serverless deploy` again. The server should deploy this time.
