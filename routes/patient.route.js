const express=require('express');
const router=express.Router();
const controllers=require('../controllers/patient.controller')

//Route to add a new patient
router.post('/', controllers.addNewPatient);

//Route to get all the patients
router.get('/', controllers.getAllPatients);

//Route to get patient by id
router.get('/:id',controllers.getPatientByID)



module.exports=router;