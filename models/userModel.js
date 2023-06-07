const mongoose=require('mongoose');
const validator=require('validator');//A library of string validators and sanitizers.
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const crypto=require('crypto');

const userSchema=new mongoose.Schema({ 
    name: {
        type: String,
        required: [true, "Please provide a name"], //if true : err msg
        maxlength: [40, "Name should be under 40 character"],
      },
      email: {
        type: String,
        required: [true, "Please enter an email"],
        validate: [validator.isEmail, "Please enter email in correct format"],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "please provide a password"],
        minlength: [6, "password should be atleast of 6 character"],
        select: false, //while calling user pass not present by default, call it explicitly
      },
      role: {
        type: String,
        default: "user",
      },
      photo: { //for photo 2 fields we get from  cloudinary
        id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
      },
      forgotPasswordToken: String,
    
      forgotPasswordExpiry: Date,
    
      createdAt: {
        type: Date,
        default: Date.now,
      },
});


//encrypt plain password before saving in DB -- with the help of hook = lifecycle event (pre & post )
// userSchema.pre("save", async function(){})
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){ //if password is not modified
        return next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});


//method to compare entered password with the password in DB
userSchema.methods.isValidatedPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

//method to create and return jwt token(string)
//whenever you are saving data in db it will auto generates id field (bson fromat) (_id)
    //return jwt.sign({check _id}, secret, {expiry time})
userSchema.methods.getJwtToken=function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, { expiresIn:process.env.JWT_EXPIRE });
}

//method for forgot password token generation (just string)
//this token will be sent to user in mail  //this token will be compared with the token in DB
userSchema.methods.getForgotPasswordToken=function(){
    const resetToken=crypto.randomBytes(20).toString("hex"); //random string of 20 bytes
    this.forgotPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex"); //hashing the token
    this.forgotPasswordExpiry=Date.now()+30*60*1000; //30 min
    return resetToken;
}




module.exports=mongoose.model("User",userSchema);