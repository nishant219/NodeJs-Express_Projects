const express= require("express");
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors');

const dotenv=require('dotenv');
dotenv.config();

const app=express();


//middlewares
app.use(cors()); //to allow cross origin requests
app.use(express.json()); // Parse JSON bodies for API endpoints
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies for HTML form submissions
app.use(bodyParser.json()); // Parse JSON bodies for API endpoints
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies for HTML form submissions


//routes
const userRoutes=require("./routes/task.js");
app.use("/api/v1",userRoutes);


const port=process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  }
)

//----------------------------------------------------------------------------------------------------
//DB connection

DB_USERNAME=process.env.DB_USERNAME;
DB_PASSWORD=process.env.DB_PASSWORD;

const db_link=`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.0zqbkkz.mongodb.net/?retryWrites=true&w=majority`;

mongoose
.connect( db_link, { useNewUrlParser: true, useUnifiedTopology: true })
.then(function(db){
    console.log("__ DB CONNECTED __");
})
.catch(function(err){
    console.log(err);
})

//----------------------------------------------------------------------------------------------------

