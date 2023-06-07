const express=require('express');
const router=express.Router();

const {signup, login, logout, forgotPassword , passwordReset, getLoggedInUsersDetails, updatePassword, updateProfile} =require("../controllers/userController.js");
const { isLoggedIn } = require('../middlewares/allUser.js');


router.route("/signup").post(signup);
router.route("/login").post(login); 
router.route("/logout").get(logout);
router.route("/forgotPassword").post(forgotPassword);
router.route("/password/reset/:token").post(passwordReset);
router.route("/userDashboard").get(isLoggedIn, getLoggedInUsersDetails);
router.route("/password/update").post(isLoggedIn, updatePassword);
router.route("/userDashboard/update").post(isLoggedIn, updateProfile);

module.exports=router;