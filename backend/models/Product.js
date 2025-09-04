const mongoose = require('mongoose');

// Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false }  
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
