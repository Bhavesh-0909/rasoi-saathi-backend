const mongoose = require('mongoose');

const foodBankSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    donationsGot: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donation'
    }],
    isVerfied: {
      type: Boolean,
      default: false
    }
  }, { timestamps: true });
  
  module.exports = mongoose.model('FoodBank', foodBankSchema);
  