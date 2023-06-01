const mongoose=require("mongoose");

const userDataSchema=new mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        trim:true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
      },
      age: {
        type: Number,
      },
    },
    
    { timestamps: true }

);



module.exports=mongoose.model("User", userDataSchema);