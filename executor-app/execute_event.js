'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const https = require('https');
const http = require('http');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.execute = (event, context, callback) => {
  
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.id,
    },
  };

  // fetch event from the database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the item.',
      });
      return;
    }

    //Make API call
    console.log('Sending ' + result.Item.method + ' request to ' + result.Item.url)

    const myURL = new URL(result.Item.url);
    const dataString = (result.Item.payload !== undefined) ? JSON.stringify(result.Item.payload) : ""; 

    const options = {
      host: myURL.host,
      path: myURL.pathname + myURL.search,
      method: result.Item.method,
      rejectUnauthorized: false
    }

    if(result.Item.headers !== undefined){
      options.headers = JSON.stringify(result.Item.headers);
    }

    if(myURL.protocol === "http:"){
      var req = http.request(options, function (res) {
        res.setEncoding('utf-8')
        var responseString = ''

        res.on('data', function (data) {
          responseString += data
        })
        res.on('end', function () {
          console.log(responseString)
        })
      })

      if(result.Item.method !== 'GET' && result.Item.method !== 'HEAD'){
        req.write(dataString)
      }
      req.end()
    }
    else{         //else it is https
      var req = https.request(options, function (res) {
        res.setEncoding('utf-8')
        var responseString = ''

        res.on('data', function (data) {
          responseString += data
        })
        res.on('end', function () {
          console.log(responseString)
        })
      })

      req.write(dataString)
      req.end()
    }
    

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};
