const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  auth: String,
  cities: Array,
},);

module.exports = mongoose.model('users', schema);
