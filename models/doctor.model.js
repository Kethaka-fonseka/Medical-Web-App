const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({

  
  firstName: {
    type: String,
    trime: true,
    required: true,
  },
  lastName: {
    type: String,
    trime: true,
    required: true,
  },
  userName: {
    type: String,
    trime: true,
    required: true,
  },
  ward: {
    type: String,
    trime: true,
    required: true,
  },
  password: {
    type: String,
    trime: true,
    required: true
  }
   
});

module.exports = mongoose.model("doctors", doctorSchema);