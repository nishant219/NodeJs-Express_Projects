const express=require("express");
const router=express.Router();

const {createUser, getAllUsers, getSingleUser, deleteUser, updateUser} =require("../Controllers/userController");


router.post("/create",createUser);
router.get("/allUsers", getAllUsers);
router.get("/:id", getSingleUser);
router.delete("/:id", deleteUser);
router.patch("/update/:id", updateUser);


module.exports =router;