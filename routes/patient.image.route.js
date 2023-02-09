const express=require('express');
const router=express.Router();
const controllers=require('../controllers/patient.image.controller')
const multer=require('multer');

const FileStorage=multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'../frontend/public/images')
    },
    filename:(req,file,callback)=>{
        callback(null,file.originalname)
    }
})

//Route for add new image for a patient
const upload = multer({storage:FileStorage})
router.post('/',upload.single('image'),controllers.addNewImage);

//Route for view all the Images by the patient ID
router.get('/:id', controllers.viewImagesofPatient )

module.exports=router;
