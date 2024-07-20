require('dotenv').config();
const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');

require('../db/connection');
const cookieParser = require('cookie-parser');
const userAuth = require('../middleware/userauthentication');
const listing = require('../models/listing');
const userRegistration = require('../models/user.js');
const adminRegistration = require('../models/admin.js');
const jwt = require('jsonwebtoken');
const images = require('../public/images');
const { route } = require('./user_route');
const orderRegistration = require('../models/bookings.js');

Router.use(express.json());
Router.use(express.urlencoded({ extended: false }));

Router.get('/property-details/:propertyid', async (req, res) => {
  try {
    const requestedProperty = mongoose.Types.ObjectId.isValid(req.params.propertyid)
    
    const property = await listing.findOne({
      _id: req.params.propertyid,
    });
   
    const propertyowner = await adminRegistration.find({
      email: property.owner,
    });
   
    
    const token = await req.cookies.jwt;
    if (token) {
      const verifyUser = jwt.verify(token, process.env.API_KEY);
      const useremail = await userRegistration.find({ _id: verifyUser._id });
      res.render('propertydetails', {
        images,
        property: property,
        useremail: useremail[0],
        propertyowner: propertyowner[0]
      });
    } else {
      res.render('propertydetails', {
        images,
        property: property,
        useremail: undefined,
        propertyowner: propertyowner[0]
      });
    }
  } catch (err) {
    console.log(err, 'line no 49');
  }
  
});



Router.post("/reserve/:id", async(req, res) => {

try {
const property = await listing.findOne({_id:req.params.id}) 
const { check_in, check_out, guest} = req.body;
const totalAmount = property.price*guest
const my_mybookings = new orderRegistration({
  totalPrice: totalAmount,
  propertyName: property.propertyName,
  image: property.image,
  fromDate: check_in,
  toDate: check_out,
  requestBy:property._id,
});

const complete = await my_mybookings.save();
res.redirect("/my-bookings");

} catch (error) {
  
console.log(error);

}


});



Router.get('/my-bookings',userAuth, async (req, res) => {
  const token = await req.cookies.jwt;
  const verifyUser = jwt.verify(token, process.env.API_KEY);
  const useremail = await userRegistration.find({ _id: verifyUser._id });
   const mybookings = await orderRegistration.find(); 
   console.log(mybookings); 
    res.render("mybookings", {
      useremail: useremail[0],
      mybookings,
    }); 
});


Router.get("/cancel/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedBooking = await orderRegistration.findByIdAndRemove(id);
    console.log(deletedBooking);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }

});


module.exports = Router;
