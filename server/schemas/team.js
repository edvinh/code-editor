const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const teamSchema = new mongoose.Schema({
  name: String,
  errs: Number,
  drinks: Number,
})
module.exports = mongoose.model('Team', teamSchema)