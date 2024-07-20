const Sib = require('sib-api-v3-sdk');
const mongoose = require('mongoose');

function generateOTP() {
  const digits = '123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 9)];
  }
  return OTP;
}

function sendOTP(firstName, email) {
  const OTP = generateOTP();

  const client = Sib.ApiClient.instance;

  const apiKey = client.authentications['api-key'];
  apiKey.apiKey = process.env.API_KEY;

  const sender = {
    email: 'devenderkumar9695@gmail.com',
    name: 'devender kumar',
  };

  const recivers = [
    {
      email: email,
    },
  ];

  const transactionalEmailApi = new Sib.TransactionalEmailsApi();

  transactionalEmailApi
    .sendTransacEmail({
      subject: 'YOUR OTP IS...',
      sender,
      to: recivers,
      // textContent: `Cules Coding will teach you how to become a {{params.role}} developer.`,
      htmlContent: `<h1>Dear ${firstName} your OTP is: ${OTP}</h1>`,
    })
    .then(console.log)
    .catch(console.log);

  return OTP;
}

module.exports = sendOTP;
