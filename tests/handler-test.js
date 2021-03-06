'use strict';

const handler = require('../handler');
const chai = require('chai');
const expect = chai.expect;

const correctEvent = {
    "Records":[
      {
        "eventVersion":"2.0",
        "eventSource":"aws:s3",
        "awsRegion":"us-west-2",
        "eventTime":"1970-01-01T00:00:00.000Z",
        "eventName":"ObjectCreated:Put",
        "userIdentity":{
          "principalId":"AIDAJDPLRKLG7UEXAMPLE"
        },
        "requestParameters":{
          "sourceIPAddress":"127.0.0.1"
        },
        "responseElements":{
          "x-amz-request-id":"C3D13FE58DE4C810",
          "x-amz-id-2":"FMyUVURIY8/IgAtTv8xRjskZQpcIZ9KG4V5Wp6S7S/JRWeUWerMUE5JgHvANOjpD"
        },
        "s3":{
          "s3SchemaVersion":"1.0",
          "configurationId":"testConfigRule",
          "bucket":{
            "name":"operata-filelog-bucket",
            "ownerIdentity":{
              "principalId":"A3NL1KOZZKExample"
            },
            "arn":"arn:aws:s3:::operata-filelog-bucket"
          },
          "object":{
            "key":"HappyFace.log",
            "size":1024,
            "eTag":"d41d8cd98f00b204e9800998ecf8427e",
            "versionId":"096fKKXTRTtl3on89fVO.nfljtsv6qko"
          }
        }
      }
    ]
  };

describe('Tests handler', function () {
    it('verifies successful response', async () => {
        const result = await handler.s3TriggerFunction(correctEvent);

        expect(result).to.be.an('object');
        expect(result.statusCode).to.equal(200);
        expect(result.body).to.be.a('string');

        let response = JSON.parse(result.body);

        expect(response).to.be.an('object');
        expect(response.message).to.have.string("A log file has been successfully uploaded to");
    });
});


