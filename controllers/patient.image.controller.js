const PatientImage = require('../models/patient.image.model');
const datetime = new Date();
datetime.setTime( datetime.getTime() + 5* 60* 60* 1000 + 30* 60* 1000 );//Add 5 hrs and 30 min to convert time to colombo time

//Add new image for a particular patient
const addNewImage = async (req, res) => {
    if (req.body) {
      const patientImage = new PatientImage({
        patient: req.body.patient,
        doctor: req.body.doctor,
        name: req.file.originalname,
        uploaded_time: datetime,
      });
      try {
        const newPatientImage = await patientImage.save();
        res.status(201).json(newPatientImage);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  };

  //View all the images of a particular patient
  const viewImagesofPatient = async (req, res) => {
    try {
        const images =await  PatientImage.find({ patient: req.params.id });
        if (images == null) {
          return res.status(400).send("No images found");
        }else{
            return res.status(200).json(images);
        }
    
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  module.exports = {
    addNewImage,
    viewImagesofPatient
  };