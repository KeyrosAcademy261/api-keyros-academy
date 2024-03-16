const User = require("../models/userModels");
const Admin = require("../models/adminModels");
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
};

//login admin
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.login(email, password);
    //create a token
    const token = createToken(admin._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    //create a token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const signUpUser = async (req, res) => {
  const { email, password, lastname, firstname } = req.body;
  try {
    const user = await User.signup(email, password, lastname, firstname);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const signUpAdmin = async (req, res) => {
  const { email, password, lastname, firstname } = req.body;
  try {
    const user = await Admin.signup(email, password, lastname, firstname);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all user
const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

//get one user
const getUser = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: "No such user"})
}
const user = await User.findById(id)
console.log(user.password)
if(!user){
    return res.status(404).json({error: 'No such video'})
}
res.status(200).json(user);
};

//update an user
const updateUser = async (req, res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: 'No such user'})
  }
  const {lastname, firstname, email, password} = req.body
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await User.findByIdAndUpdate({_id:id}, {lastname, firstname, email, password:hash })

  if(!user){
    res.status(404).json({error: 'No such User'})
  }
  res.status(200).json(user)
}

//delete an user
const deleteUser=async(req,res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No Such User'})
  }
  const user = await User.findByIdAndDelete(id)
  if(!user){
    return res.status(404).json({error:'No Such User'})
  }
  res.status(200).json(user)
}
module.exports = {
  loginUser,
  signUpUser,
  getAllUsers,
  adminLogin,
  signUpAdmin,
  getUser,
  updateUser,
  deleteUser
};
