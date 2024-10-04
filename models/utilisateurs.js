const mongoose = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator');

const signupSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  
});

//userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Signup', signupSchema);