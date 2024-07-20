const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const bookingSchema = new mongoose.Schema({
  // firstName: {
  //   type: String,
  //   required: true,
  // },
  // lastName: {
  //   type: String,
  //   required: true,
  // },
  // totalGuest: {
  //   type: Number,
  //   required:true
  // },
  totalPrice: {
    type: String,
    required: true,
  },
  propertyName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  requestBy: {
    type: String,
    required: String,
  },
  // requestTo: {
  //   type: String,
  //   required: true,
  // },
});


const orderRegistration = new mongoose.model('orderRegistration', bookingSchema);

module.exports = orderRegistration;
