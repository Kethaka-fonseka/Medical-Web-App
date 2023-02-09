const express = require('express');
const router =  express.Router();
const controller = require('../controllers/doctor.controller');

//Route for create new doctor
router.post('/', controller.addNewDoctor);

//Route for retrieve all the doctor
router.get('/', controller.viewAllDoctors);

//Route for login method for doctors
router.post('/login', controller.loginOfDoctors);

module.exports = router;