require('dotenv').config();
const express = require('express');
const fs = require('fs');
const Router = express.Router();
const mongoose = require('mongoose');
let multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// const url = require('url');
require('../db/connection');
const cookieParser = require('cookie-parser');
const adminAuth = require('../middleware/adminauthentication');
const adminRegistration = require('../models/admin.js');
const propertyRegistration = require('../models/listing.js');
const sendOTP = require('../public/otp');

Router.use(express.json());
Router.use(express.urlencoded({ extended: false }));

//Storage Setting
let storage = multer.diskStorage({
 destination: function (req, file, cb) {
            cb(null, ".public/uploads")
        },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});



//Upload Setting
let upload = multer({
  storage,
});

Router.get('/host', async (req, res) => {
  const token = await req.cookies.adminjwt;
  if (token) {
    const verifyUser = jwt.verify(token, process.env.API_KEY);
    const useremail = await adminRegistration.find({ _id: verifyUser._id });
    res.render('host', {
      useremail: useremail[0],
    });
  } else {
    res.render('host', {
      useremail: undefined,
    });
  }
});

Router.get('/admin-dashboard', adminAuth, async (req, res) => {
  try {
    const token = await req.cookies.adminjwt;
    const verifyUser = jwt.verify(token, process.env.API_KEY);
    const useremail = await adminRegistration.find({ _id: verifyUser._id });
    const listings = await propertyRegistration.find({
      owner: useremail[0].email,
    });

    res.render('admindashboard', {
      listings,
      useremail:useremail[0]
    });
  } catch (err) {
    console.log(err);
  }
});

Router.post(
  '/admin/register',
  upload.single('profilePic'),
  async (req, res) => {
    try {
      const { firstName, lastName, email, password, confirmPassword } =
        req.body;
      if (password !== confirmPassword) {
        req.flash('error', 'Password does not match');
        res.redirect('/host');
      }
      const registeredData = await adminRegistration.findOne({
        email: email.toLowerCase(),
      });
      if (!registeredData) {
        //sending otp to user
        const OTP = sendOTP(firstName, email);
        const newUser = new adminRegistration({
          firstName,
          lastName,
          email: email.toLowerCase(),
          password,
          confirmPassword,
          profilePic: req.file.filename,
          OTP,
        });
        const registered = await newUser.save();
      } else if (registeredData) {
        req.flash('error', 'this email is already been used');
        res.redirect('/host');
      } else {
        req.flash('error', 'server error try again later');
        res.redirect('/host');
        res.status(500);
      }
    } catch (e) {
      req.flash('error', e);
      res.redirect('/host');
      res.status(400);
    }
  }
);

Router.post('/admin/otp-verification', async (req, res) => {
  const { email, otp } = req.body;
  const useremail = await adminRegistration.findOne({
    email: email.toLowerCase(),
  });
  if (useremail) {
    if (useremail.OTP == otp) {
      const deleteField = await adminRegistration.findOneAndUpdate(
        { email: email.toLowerCase() },
        { $unset: { OTP: '' } }
      );
      req.flash(
        'success',
        `${useremail.firstName} You have successfully registered your account`
      );
      res.redirect('/host');
    } else {
      const id = useremail._id;
      const getData = await adminRegistration.findByIdAndDelete(id);
      req.flash('error', 'Invalid OTP entered');
      res.redirect('/host');
    }
  } else {
    req.flash('error', 'Invalid email entered');
    res.redirect('/host');
  }
});

Router.post('/admin/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await adminRegistration.findOne({
      email: email.toLowerCase(),
    });
    

    if (useremail) {
      const isMatch = await bcrypt.compare(password, useremail.password);
      

      if (isMatch) {
        const token = jwt.sign(
          { _id: useremail._id.toString() },
          process.env.API_KEY
        );
        
        res.cookie('adminjwt', token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
          // secure:true
        });

       
        req.flash(
          'success',
          `${useremail.firstName} You have successfully logged in your account`
        );
        res.redirect('/host', {
          useremail: useremail,
        });
      } else {
        req.flash('error', 'You have entered invalid login details');
        res.redirect('/host');
      }
    } else {
      req.flash('error', 'You have entered invalid login details');
      res.redirect('/host');
    }
  } catch (err) {
    req.flash('error', err);
    res.redirect('/host');
  }
});

Router.post('/list-property', upload.single('image'), async (req, res) => {
  try {
    const token = await req.cookies.adminjwt;
    const verifyUser = jwt.verify(token, process.env.API_KEY);
    const useremail = await adminRegistration.find({ _id: verifyUser._id });

    const {
      propertyName,
      city,
      state,
      country,
      address,
      price,
      bed,
      bathRoom,
      cancellationPolicies,
    } = req.body;

    const newListing = new propertyRegistration({
      propertyName,
      image: req.file.filename,
      city,
      state,
      country,
      address,
      price,
      bed,
      bathRoom,
      cancellationPolicies,
      owner: useremail[0].email,
    });
    const registered = await newListing.save();

    req.flash('success', 'Your property added successfully');
    res.redirect('/admin-dashboard');
  } catch (err) {
    console.log(err);
    req.flash('error', err);
    res.redirect('/admin-dashboard');
  }
});

Router.get('/delete/:property_id', async (req, res) => {
  try {
    const propertyImage = await propertyRegistration.find({
      _id: req.params.property_id,
    });
    const propertyURL = propertyImage[0].image;
    fs.unlink('./public/uploads/' + propertyURL, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });

    const property = await propertyRegistration.findByIdAndDelete(
      req.params.property_id
    );

    req.flash('success', 'Your property deleted successfully');
    res.redirect('/admin-dashboard');
  } catch (err) {
    console.log(err);
  }
});

Router.post(
  '/update/:property_id',
  upload.single('image'),
  async (req, res) => {
    const {
      propertyName,
      city,
      state,
      country,
      address,
      price,
      bed,
      bathRoom,
      cancellationPolicies,
    } = req.body;

    if (req.file) {
      const propertyImage = await propertyRegistration.find({
        _id: req.params.property_id,
      });
      const propertyURL = propertyImage[0].image;
      fs.unlink('./public/uploads/' + propertyURL, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
      const property = await propertyRegistration.findByIdAndUpdate(
        req.params.property_id,
        {
          propertyName,
          image: req.file.filename,
          city,
          state,
          country,
          address,
          price,
          bed,
          bathRoom,
          cancellationPolicies,
        })
        req.flash('success', 'Your property updated successfully');
        res.redirect('/admin-dashboard');
    } else {
      const property = await propertyRegistration.findByIdAndUpdate(
        req.params.property_id,
        {
          propertyName,
          city,
          state,
          country,
          address,
          price,
          bed,
          bathRoom,
          cancellationPolicies,
        })
        req.flash('success', 'Your property updated successfully');
        res.redirect('/admin-dashboard');
    }});



Router.get('/admin-logout', (req, res) => {
  res.clearCookie('adminjwt');
  req.flash('success', 'You have successfully logged out your account');
  res.redirect('/host');
});

module.exports = Router;
