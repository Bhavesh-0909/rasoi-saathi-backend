const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  productAmount: {
    type: Number,
    required: true
  },
  productExpiry: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
