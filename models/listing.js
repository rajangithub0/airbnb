const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bed: {
    type: Number,
    required: true,
  },
  bathRoom: {
    type: Number,
    required: true,
  },
  cancellationPolicies: {
    type: String,
    require: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

const listing = new mongoose.model('listing',listingSchema)

module.exports = listing