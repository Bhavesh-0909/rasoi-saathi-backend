const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    donations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Donation'
    }],
    foodInventory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('User', userSchema);
  