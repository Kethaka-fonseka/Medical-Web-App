 const express=require("express");
 const bodyParser=require("body-parser");
 const cors=require("cors");
 const connectDB =require('./connection');
 const app=express();
 const cookieParser = require("cookie-parser");


 //server run in this port 8070
 const PORT = process.env.PORT || 8070;


 //Connect data base
 connectDB();
 app.use(express.json());
 app.use(cookieParser());
 app.use(cors( ));
 
 app.use(bodyParser.json());


//Getting the doctor route
const doctorRoute = require('./routes/doctor.route');
app.use('/doctors', doctorRoute);

//Getting the patient route
const patinetRoute = require('./routes/patient.route');
app.use('/patients', patinetRoute);

//Getting the patient images route
const patinetImageRoute = require('./routes/patient.image.route');
app.use('/images', patinetImageRoute);

//error handling in server
app.use((error, req, res, next)=>{
  const status = error.status || 500
  const message = error.message || 'Internal server error'  
  res.status(status).send(message);

});

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    const status = 404;
    next(error);
  
  });

app.listen(PORT,() =>{
    console.log(`Service is running on ${PORT}`);
});
