require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app=express();

const connectDB = require('./db/connect');

const notFoundMiddleware=require("./middleware/not-found");
const errorMiddleware=require("./middleware/error-handler");

//middlewares
app.use(express.json());
// app.use(notFoundMiddleware);
// app.use(errorMiddleware);


//routes
const productRouter = require("./routes/products");
 app.use("/api/v1/products",productRouter);

const port = process.env.PORT ||  5000;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


//connection to db
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        console.log("__ Connected to DB __");
    }catch(err){
        console.log(err);
    }
}
start();