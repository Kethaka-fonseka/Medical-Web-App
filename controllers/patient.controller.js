const Patient = require("../models/patient.model");

//Create a new patient
const addNewPatient = async (req, res) => {
  const patient = new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dob: req.body.dob,
  });
  try {
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Get all the patients
const getAllPatients = async (req, res) => {
  try {
    const patientList = await Patient.find({});
    if (patientList == null) {
      res.status(404).send("Not Found");
    } else {
      res.status(200).json(patientList);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get a patient details by id
const getPatientByID = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (patient == null) {
      res.status(400).send("Patient Not Found");
    } else {
      res.status(200).json(patient);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPatients,
  addNewPatient,
  getPatientByID,
};
