const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const morgan=require('morgan');
const fileUpload=require('express-fileupload');
require('dotenv').config();

const connectionWithDb=require("./config/db.js");

const app=express();

app.use(express.json()); // for parsing application/json
app.use(bodyParser.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies
app.use(cors()); // for cross origin resource sharing
app.use(morgan("tiny")); // for logging the history of requests in console
app.use(fileUpload({ useTempFiles:true, tempFileDir:"/tmp/" }) ); // for uploading files
app.use(express.urlencoded({extended:true}) ); // for parsing application/x-www-form-urlencoded

const PORT=process.env.PORT || 5000;

connectionWithDb();

//cloudinary config
const cloudinary=require("cloudinary");
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
});


const userRoutes=require("./routes/userRoutes.js");
app.use("/api/v1",userRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});


