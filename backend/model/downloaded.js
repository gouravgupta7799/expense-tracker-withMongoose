
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let DownloadedSchema = new Schema({
  URL: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    require: true
  }
})

module.exports = mongoose.model('Downloaded', DownloadedSchema);