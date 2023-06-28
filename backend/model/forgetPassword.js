
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forgetPasswordSchema = new Schema({
  id: {
    type: String,
    require: true
  },
  isValid: {
    type: Boolean
  },
  userId: {
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('forgetPassword', forgetPasswordSchema);