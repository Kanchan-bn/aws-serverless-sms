'use strict';

const smsNotification = require('../smsNotification');
const chai = require('chai');
const expect = chai.expect;

describe('Tests notifyUserBySms function by changing from and to numbers', function () {
    it('verifies successful response', async () => {
        const result = await smsNotification.notifyUserBySms();

        expect(result).to.be.an('object');
        expect(result.body).to.have.string("A log file has been successfully uploaded to");
        expect(result.status).to.have.string('queued');
        expect(result.body).to.be.a('string');
    });
});

describe('Tests notify function by changing from and to numbers', function () {
    let testError;
    it('verifies error response for empty from number', async () => {
        const from = '';
        const to = '';
        try{
            const result = await smsNotification.notify(from, to);
        }catch(err){
            testError = err.message;
        }         

        expect(testError).to.be.a('string');
        expect(testError).to.have.string("A 'From' phone number is required.");
    });

    it('verifies error response for empty to number', async () => {
        const from = process.env.TWILIO_SMS_FROM_NUMBER;
        const to = '';
        try{
            const result = await smsNotification.notify(from, to);
        }catch(err){
            testError = err.message;
        }         
        expect(testError).to.be.a('string');
        expect(testError).to.have.string("A 'To' phone number is required.");
    });
   
});