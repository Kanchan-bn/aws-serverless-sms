'use strict';
const smsNotification  = require('./smsNotification');
let response;

module.exports.s3TriggerFunction = async event => {
    console.log('serverless function');
    const record = event.Records[0];
    const eName = record.eventName;
    const bucketName = record.s3.bucket.name;
    const objKey = record.s3.object.key;

    let returnCode;
    let returnStatus;
    let returnMessage;

    //if it is a put event - uploading of a file
    if(eName.split(':')[1] === 'Put' && objKey.includes('.log')){
        try{
            let notification = await smsNotification.notifyUserBySms();
            console.log(notification);
            returnCode = 200;
            returnStatus = notification.status;
            returnMessage = notification.body + '' + bucketName;
        }catch(err){
            if(err.message.includes('phone number is required') || err.Message.includes('phone number is required')){
                returnCode = 400;
                returnStatus = 'failed';
                returnMessage = 'From or To phone number is not configured';
            }else{
                returnCode = 500;
                returnStatus = 'failed';
                returnMessage = err.message;
            }
        }
    }else {
        returnCode = 200;
        returnStatus = 'failed'
        returnMessage= 'Detected an event that was not a \'Put\', configure trigger on Function';
    }
    response = {
        'statusCode': returnCode,
        'status': returnStatus,
        'body': JSON.stringify({message: returnMessage})
    }
    console.log(response);
    return response

};
