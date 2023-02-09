const mongoose = require("mongoose");

const patientImageSchema = new mongoose.Schema({
patient: {
    type: String,
    required: true,
},
doctor: {
    type: String,
    required: true,
},
name: {
    type: String,
    trime: true,
    required: true,
},
uploaded_time: {
    type: Date,
    default: Date.now(),
}

});

module.exports = mongoose.model("patient_images", patientImageSchema);