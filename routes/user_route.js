require('dotenv').config();
const express = require('express');
const fs = require('fs');
const Router = express.Router();
const mongoose = require('mongoose');
let multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('../db/connection');
const cookieParser = require('cookie-parser');
const auth = require('../middleware/adminauthentication');
const userRegistration = require('../models/user.js');
const sendOTP = require('../public/otp');

Router.use(express.json());
Router.use(express.urlencoded({ extended: false }));

//Storage Setting
let storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

//Upload Setting
let upload = multer({
  storage,
});

Router.post('/user/register', upload.single('profilePic'), async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      req.flash('error', 'Password does not match');
      res.redirect('/');
    }
    const registeredData = await userRegistration.findOne({
      email: email.toLowerCase(),
    });
    if (!registeredData) {
      //sending otp to user
      const OTP = sendOTP(firstName, email);
      const newUser = new userRegistration({
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
      res.redirect('/');
    } else {
      req.flash('error', 'server error try again later');
      res.redirect('/');
      res.status(500);
    }
  } catch (e) {
    req.flash('error', e);
    res.redirect('/');
    res.status(400);
  }
});

Router.post('/user/otp-verification', async (req, res) => {
  const { email, otp } = req.body;
  
  const useremail = await userRegistration.findOne({
    email: email.toLowerCase(),
  });
  
  if (useremail) {
    if (useremail.OTP == otp) {
      const deleteField = await userRegistration.findOneAndUpdate(
        { email: email.toLowerCase() },
        { $unset: { OTP: '' } }
      );
      req.flash(
        'success',
        `${useremail.firstName} You have successfully registered your account`
      );
      res.redirect('/');
    } else {
      const id = useremail._id;
      const getData = await userRegistration.findByIdAndDelete(id);
      req.flash('error', 'Invalid OTP entered');
      res.redirect('/');
    }
  } else {
    req.flash('error', 'Invalid email entered');
    res.redirect('/');
  }
});

// Router.post('/user/login', async (req, res) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;
//     const useremail = await userRegistration.findOne({
//       email: email.toLowerCase(),
//     });
    

//     if (useremail) {
//       const isMatch = await bcrypt.compare(password, useremail.password);
     

//       if (isMatch) {
//         const token = await jwt.sign(
//           { _id: useremail._id.toString() },
//           process.env.SECRET_KEY
//         );
        
//         res.cookie('jwt', token, {
//           expires: new Date(Date.now() + 3600000),
//           httpOnly: true,
//           // secure:true
//         });

        
//         req.flash(
//           'success',
//           `${useremail.firstName} You have successfully logged in your account`
//         );
//         res.redirect('/', {
//           useremail,
//         });
//       } else {
//         req.flash('error', 'You have entered invalid login details');
//         res.redirect('/');
//       }
//     } else {
//       req.flash('error', 'You have entered invalid login details');
//       res.redirect('/');
//     }
//   } catch (err) {
//     req.flash('error', err);
//     res.redirect('/');
//   }
// });

Router.post("/user/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await userRegistration.findOne({
      email: email.toLowerCase(),
    });

    if (useremail) {
      const isMatch = await bcrypt.compare(password, useremail.password);

      if (isMatch) {
        const token = jwt.sign(
          { _id: useremail._id.toString() },
          process.env.API_KEY
        );

        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
          // secure:true
        });

        req.flash(
          "success",
          `${useremail.firstName} You have successfully logged in to your account`
        );
        res.redirect("/");
      } else {
        req.flash("error", "Invalid email or password");
        res.redirect("/");
      }
    } else {
      req.flash("error", "Invalid email or password");
      res.redirect("/");
    }
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/");
  }
});






Router.post(
  '/update/user-profile',
  upload.single('profilePic'),
  async (req, res) => {
    const { firstName, lastName } = req.body;
    if (req.file) {
      const token = await req.cookies.jwt;
      const verifyUser = jwt.verify(token, process.env.API_KEY);
      const useremail = await userRegistration.find({ _id: verifyUser._id });
      const profileURL = useremail[0].profilePic;
      fs.unlink('./public/uploads/' + profileURL, (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
      const user = await userRegistration.findByIdAndUpdate(useremail[0]._id, {
        firstName:firstName,
        profilePic: req.file.filename,
        lastName:lastName,
      });
      req.flash('success', 'Your profile updated successfully');
      res.redirect('/');
    } else {
      const token = await req.cookies.jwt;
      const verifyUser = jwt.verify(token, process.env.API_KEY);
      const useremail = await userRegistration.find({ _id: verifyUser._id })
      const user = await userRegistration.findByIdAndUpdate(useremail[0]._id, {
        firstName:firstName,
        lastName:lastName,
      });
      req.flash('success', 'Your profile updated successfully');
      res.redirect('/');
    }
  }
);





Router.get('/user-logout', (req, res) => {
  res.clearCookie('jwt');
  req.flash('success', 'You have successfully logged out your account');
  res.redirect('/');
});





module.exports = Router;
