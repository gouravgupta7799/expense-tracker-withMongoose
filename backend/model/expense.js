const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseShema = new Schema({
  Description: {
    type: String,
    require: true,
  },
  Price: {
    type: String,
    require: true,
  },
  Category: {
    type: String,
    require: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true,
  }
});

module.exports = mongoose.model('Expense', expenseShema);