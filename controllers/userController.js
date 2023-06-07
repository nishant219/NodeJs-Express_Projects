const User = require("../models/userModel");
const BigPromise=require("../middlewares/bigPromise");
const customError=require("../utils/customError");
const cookieToken=require("../utils/cookieToken");
const fileUpload=require("express-fileupload");
const cloudinary=require("cloudinary");
const emailHelper=require("../utils/emailHelper");
const crypto=require("crypto");


//to signup a user
// exports.signup=BigPromise(async()=>{})
exports.signup=BigPromise(async(req,res,next)=>{

    let result; //to handle images
    if(!req.files){
        return next(new customError("Please upload a photo for signup",400));
    }

    const {name, email, password} =req.body;
    if(!email || !password || !name){
        return next(new customError("Please provide email, name & password",400));
    }

    let file=req.files.photo;
    result=await cloudinary.v2.uploader.upload(file.tempFilePath,{
        folder:"profile",
        width:150,
        crop:"scale",
    });

    const user=await User.create({name,email,password, photo:{id:result.public_id,secure_url:result.secure_url} });
    cookieToken(user,res);
})


//login 
exports.login=BigPromise(async(req,res,next)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return next(new customError("Please provide email & password",400));
    }
    //grab user from db -> user
    //as we have designed schema select:false we have to provide +password explicitely
    const user = await User.findOne({ email }).select("+password");

    //if user not present in db
    if (!user) {
        return next(new CustomError("You are not registered in the db", 400));
    }
    //now, user present in db, so check pass with the help of methods in userModel
    const isPasswordCorrect=await user.isValidatedPassword(password);
    if(!isPasswordCorrect){
        return next(new customError("Invalid email or password",401));
    }
    //if pass is correct, then generate token
    cookieToken(user,res);
})


//logout -> we are deleting tokens manually
//jwt tokens are stateless,      //we have value 'token' make it null and set expirary now
exports.logout = BigPromise(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logout success",
    });
  });
  

//forgot password - send mail to user with token 
exports.forgotPassword=BigPromise(async(req,res,next)=>{
    const {email}=req.body;
    const user=await User.findOne({email});
    if(!user){
        return next(new customError("No user with this email",404));
    }
    const forgotToken=user.getForgotPasswordToken();
    await user.save({ validateBeforeSave: false });

    //send this forgotToken to user
    //craft url for that =>   /password/reset/:token
    const myUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/password/reset/${forgotToken}`;
    //craft msg
    const message = `Copy paste this link in your URL and hit enter \n\n ${myUrl}`;

    //now mail part is here
    try{
    //mailHelper from utils //email,sub & msg
     await emailHelper({
        email: user.email,
        subject: "Password reset email",
        message,
        });
        res.status(200).json({
            success: true,
            message: "Email sent successfully",
          });

    }catch(error){
        //flush this things
        user.forgotPasswordToken = undefined;
        user.forgotPasswordExpiry = undefined;
        await user.save({ validateBeforeSave: false });
        //return err msg
        return next(new customError(error.message, 500));
    }

})



//  paswordReset
//visit url from reset mail, match that token with db token if yes then chage password //we care user whose expiray is valid(is in the future)
exports.passwordReset = BigPromise(async (req, res, next) => {
    const token = req.params.token;
    //we have to encrypt it
    const encryToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
    
    //user from db //find user based on the encrypted token(encryToken) + user whose forgotPasswordExpiry is in future
    const user = await User.findOne({
      encryToken,
      forgotPasswordExpiry: {$gt: Date.now()}
    })
    
    //if user not found
    if(!user){
    return next(new customError(`Token is invalid or expired`,400))
    }
    
    if(req.body.password !== req.body.confirmedPasword){
      return next(new customError(`entered pass and confirmed pass does not matched`, 400))
    }
    //fill the new pass
    user.password= req.body.password;
    
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    
    //save new password
    await user.save();
    //send a json or send token
    cookieToken(user, res);
    
    });
    

    
exports.getLoggedInUsersDetails=BigPromise(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    });
})
  


//to just update password //change password- when you know old password
exports.updatePassword=BigPromise(async(req,res,next)=>{
    const userId=req.user.id;
    const {oldPassword,newPassword}=req.body;
    if(!oldPassword || !newPassword){
        return next(new customError("Please provide old & new password",400));
    }
    const user=await User.findById(userId).select("+password");
    const isPasswordCorrect=await user.isValidatedPassword(oldPassword);
    if(!isPasswordCorrect){
        return next(new customError("Invalid old password",401));
    }
    user.password=newPassword;
    await user.save();
    cookieToken(user,res);

})



//to update entire user profile(details)
exports.updateProfile=BigPromise(async(req,res,next)=>{
    
    //to update name and email
    const newData={
        name:req.body.name,
        email:req.body.email
    };

    //to update image
    if(req.files){
        //delete previous photo and upload new one
        const user= await User.findById(req.user.id);
        const imgId=user.photo.id;
        const resp =await cloudinary.v2.uploader.destroy(imgId);//photo deleted
    
        //upload img =cloudinary.v2.uploader.upload(file,{})
    const result = await cloudinary.v2.uploader.upload(req.files.photo.tempFilePath, {
        folder: "users",
        width: 150,
        crop: "scale",
        });
    }
    //we can grab this 2 thing from clodinary via new uploaded photo -> result
    newData.photo={
        id: result.public_id,
        secure_url: result.secure_url
    }

    //( , , {})
    const user=await User.findByIdAndUpdate(req.user.id, newData, {
        new:true,
        runValidators:true,
        useFindAndModify:false,
    } );
    res.status(200).json({
        sucess:true,//we can pass entire user (user)here if frontend needs it
    })
})