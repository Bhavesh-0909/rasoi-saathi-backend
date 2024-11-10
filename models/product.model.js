const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  productQuantity: {
    type: Number,
    required: true
  },
  productAmount: {
    type: Number,
    required: true
  },
  buyingDate: {
    type: Date,
    required: true,
    default: Date.now()
  },
  productExpiry: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Product', productSchema);
