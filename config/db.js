const mongoose=require("mongoose");

const connectionWithDb=()=>{
    mongoose
    .connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log(`DB Connected Successfully`))
    .catch((error)=>{
        console.log(`Issue while connecting with DB`)
        console.log(error);
        process.exit(1);
    });
};

module.exports =connectionWithDb;