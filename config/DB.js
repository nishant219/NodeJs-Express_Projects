const mongoose=require("mongoose");

const connectionWithDB=async()=>{
    mongoose.connect(
        process.env.DB_URL,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }
    )
    .then(
        console.log("__ Connected to DB __")
    )
    .catch((err)=>{
        console.log("Error in connecting to DB: ");
        console.log(err);
        process.exit(1);
    })
}

module.exports=connectionWithDB;