'use strict'

const path = require('path');
const configPath = path.join(process.env.NODE_DIR || __dirname, '.dev.env');
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: configPath});
}

const accountSid = process.env.ACC_SID;
const authToken = process.env.AUTH_TOKEN;
const fromNumber = process.env.SMS_FROM_NUMBER;
const toNumber = process.env.SMS_TO_NUMBER;

const client = require('twilio')(accountSid, authToken);

module.exports.notifyUserBySms = async () => {
    const result = this.notify(fromNumber, toNumber);
    return result;
};

module.exports.notify = (fromNum, toNum) => {
    return client.messages
        .create({
        body: 'A log file has been successfully uploaded to : ',
        from: fromNum,
        to: toNum
        });
}