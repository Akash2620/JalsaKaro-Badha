const mongoose = require('./mongo');

// create a collection with schema 
const Order = new mongoose.Schema({
    
  
  address: String,
  email: String,
  phone: Number,
  product_1: String,
  product_2: String,
  name: String,
  //order_date: String,
  order_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', Order);