const Webinaire = require("../models/webinaireModels");
const mongoose = require('mongoose')

//create a new webinaire
const createNewWebinaire = async (req, res)=>{
  const {title, description, link, date, heure} = req.body
  try{
    const webinaire = await Webinaire.create({title, description, link, date, heure})
    res.status(200).json(webinaire)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

//get all webinaire
const getAllWebinaire = async (req, res) => {
  const webinaires = await Webinaire.find({}).sort({ createdAt: -1 });
  res.status(200).json(webinaires);
};

//get one webinaire
const getWebinaire = async (req, res) => {
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: "No such user"})
}
const webinaire = await Webinaire.findById(id)
if(!webinaire){
    return res.status(404).json({error: 'No such video'})
}
res.status(200).json(webinaire);
};

//update an webinaire
const updateWebinaire = async (req, res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error: 'No such user'})
  }
  const {title, description, link, date, heure} = req.body
  const webinaire = await User.findByIdAndUpdate({_id:id}, {title, description, link, date,heure})

  if(!webinaire){
    res.status(404).json({error: 'No such User'})
  }
  res.status(200).json(webinaire)
}

//delete an webinaire
const deleteWebinaire = async(req,res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No Such User'})
  }
  const webinaire = await Webinaire.findByIdAndDelete(id)
  if(!webinaire){
    return res.status(404).json({error:'No Such User'})
  }
  res.status(200).json(webinaire)
}
module.exports = {
  createNewWebinaire,
  getAllWebinaire,
  getWebinaire,
  updateWebinaire,
  deleteWebinaire
};