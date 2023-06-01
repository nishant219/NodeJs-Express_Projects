const userModel=require("../Models/userModel");

//to create user 
exports.createUser=async(req,res)=>{
    const{name,email,age}=req.body;
    try{
        const userAdded=await userModel.create({
            name:name,
            email:email,
            age:age,
        });
        res.status(201).json(userAdded);
    }catch(error){
        console.log(error);
        res.status(400).json({error:error.message});
    }
} 


//to get all users
exports.getAllUsers=async(req,res)=>{
    try {
        const allUsers = await userModel.find();
        res.status(200).json(allUsers);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}


//to get single user based on id
exports.getSingleUser=async(req,res)=>{
    const { id } = req.params;  //extract id from url with the help of param
    try {
        const singleUser = await userModel.findById({ _id: id });
        res.status(200).json(singleUser);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}


//to delete a specific user
exports.deleteUser=async(req,res)=>{
  const { id } = req.params;
  try {
    const deletedUser = await userModel.findByIdAndDelete({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


//to update user
exports.updateUser=async(req,res)=>{
    const { id } = req.params;
    console.log("get body", req.body);
    console.log("get id", id);
    //const { name, email, age } = req.body;
  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
      res.status(200).json(updatedUser);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}

