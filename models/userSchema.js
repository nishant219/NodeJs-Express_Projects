const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:255
    },
    email:{
        type:String,
        required:true,
        max:255
    },
    googleId:{
        type:String,
        min:6,
        max:255
    },
    spotifyId:{
        type:String,
        min:6,
        max:255
    }
})

module.exports=mongoose.model("User", userSchema);
