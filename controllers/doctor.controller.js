const Doctor = require("../models/doctor.model");
const bcrypt = require("bcrypt");

//create new doctor
const addNewDoctor = async (req, res) => {
  if (req.body) {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const doctor = new Doctor({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      ward: req.body.ward,
      password: hashedPassword,
    });
    try {
      const newDoctor = await doctor.save();
      res.status(201).json(newDoctor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

//view all doctors
const viewAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(201).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Login for the doctors
const loginOfDoctors = async (req, res) => {
  const doctor =await  Doctor.findOne({userName:req.body.userName});
  if (doctor == null) {
    return res.send("Unauthorized");
  }
  try {
    const state = await bcrypt.compare(req.body.password, doctor.password);
    if (state) {
      res.status(200).json(doctor);
    } else {
      res.send("Unauthorized");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addNewDoctor,
  viewAllDoctors,
  loginOfDoctors,
};
