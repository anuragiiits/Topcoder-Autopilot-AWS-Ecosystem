#!/bin/bash

# Please change the Endpoint as per your deployed URL
# Please change the Execution Time as per your convenience

curl -X POST \
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


curl -X POST \
  https://ru7grj5586.execute-api.us-east-1.amazonaws.com/dev/create \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: d781fc1f-6ce5-8844-fe0d-23cd61a59dac' \
  -d '{
  "method": "GET",
  "url": "https://jsonplaceholder.typicode.com/posts/1",
  "payload": "",
  "headers": "",
  "execution_time": "2019-09-26T22:14:00Z"
}'

# Fetch all the Events stored in database
curl -X GET \
  https://ru7grj5586.execute-api.us-east-1.amazonaws.com/dev/list \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 0229c5de-caa1-c3a1-a784-a46221f39dc0'