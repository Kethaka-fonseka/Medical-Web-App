const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({

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
  dob: {
    type: Date,
    trime: true,
    required: true,
  }
      
});

module.exports = mongoose.model("patients", patientSchema);