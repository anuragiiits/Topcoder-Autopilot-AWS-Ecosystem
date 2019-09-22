'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const stepfunctions = new AWS.StepFunctions();

module.exports.schedule = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.method !== 'string' || typeof data.url !== 'string' || typeof data.execution_time !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the event.',
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      url: data.url,
      method: data.method,
      payload: data.payload,
      headers: data.headers,
      execution_time: data.execution_time,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  // write the event to the database
  dynamoDb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error("Couldn\'t insert", error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the event.',
      });
      return;
    }

    const stateMachineArn = process.env.statemachine_arn;
    console.log("State Machine", stateMachineArn);

    const input = {
            "id": params.Item.id,             // Only passing the unique Event ID from this function to state machine instead of passing all the API data
                                              // This approach can be better because we can also update the data (except execution_time) for this event later by 
                                              // directly making changes in database and we do not need to stop/change anything in the step functions
            "execution_time": params.Item.execution_time
    }
    const stateMachineParams = {
        stateMachineArn,
        "input": JSON.stringify(input)
    }

    stepfunctions.startExecution(stateMachineParams).promise().then(() => {
        console.log(`Your statemachine ${stateMachineArn} executed successfully`);
    }).catch(error => {
        console.error(`Your statemachine ${stateMachineArn} failed`, error)
        callback(error.message);
    });

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
