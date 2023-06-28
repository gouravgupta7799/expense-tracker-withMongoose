const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userShema = new Schema({
  userName: {
    type: String,
    require: true
  },
  userEmail: {
    type: String,
    require: true
  },
  userContect: {
    type: String,
    require: true
  },
  userPassword: {
    type: String,
    require: true
  },
  isPrime: {
    type: Boolean,
    require: true
  },
  totalExpense: Number,
});

module.exports = mongoose.model('User', userShema);