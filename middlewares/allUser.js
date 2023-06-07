const User=require("../models/userModel");
const customError=require("../utils/customError");
const BigPromise=require("./bigPromise");


exports.isLoggedIn=BigPromise(async(req,res,next)=>{
    const token=req.cookies.jwt || req.headers.authorization;
    if(!token){
        return next(new customError("Please login to access this route",401));
    }
    //verify token
    const decoded=await jwt.verify(token,process.env.JWT_SECRET);
    //check if user still exists in db
    const user=await User.findById(decoded.id);
    if(!user){
        return next(new customError("User not found in db",401));
    }
    //check if user changed password after token was issued
    if(user.isPasswordChangedAfter(decoded.iat)){
        return next(new customError("User recently changed password, please login again",401));
    }
    //if all ok, grant access to protected route
    req.user=user;
    next();

})