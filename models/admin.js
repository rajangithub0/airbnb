const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  OTP: {
    type: Number,
    required: true,
  },
});

//hashing password through bcryptjs npm
adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    console.log(`the current password is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`the current password is ${this.password}`);
    this.confirmPassword = undefined;
  }
  next();
});

const adminRegistration = new mongoose.model('adminRegistration', adminSchema);

module.exports = adminRegistration;
