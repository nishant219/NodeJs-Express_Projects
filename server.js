const express = require('express');
const mongoose=require("mongoose");
require('dotenv').config();
const cors=require("cors");
const bodyParser = require('body-parser');

const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const port=process.env.PORT || 8000;

app.use(
    express.urlencoded({ extended: true })
);
    

//routes
const userRoutes=require("./Routes/userRoute");
app.use("/api", userRoutes);


app.listen(port, ()=>{
    console.log(`App running on the PORT: ${port}`);
})


//----------------------------------------------------------------------------------------------------
//DB connection

DB_USERNAME=process.env.DB_USERNAME;
DB_PASSWORD=process.env.DB_PASSWORD;

const db_link=`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.q0aavq3.mongodb.net/?retryWrites=true&w=majority`;
// const db_link=`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.q0aavq3.mongodb.net/?retryWrites=true&w=majority`;

mongoose
.connect( db_link, { useNewUrlParser: true, useUnifiedTopology: true })
.then(function(db){
    console.log("__ DB CONNECTED __");
})
.catch(function(err){
    console.log(err);
})

//----------------------------------------------------------------------------------------------------

