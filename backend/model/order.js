const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({

  paymantId: String,
  orderId: String,
  status: String
});

module.exports = mongoose.model('Order', orderSchema);