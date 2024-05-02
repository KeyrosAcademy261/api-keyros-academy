const Message = require("../models/messageModels");
const mongoose = require("mongoose");

//create a new message
const createNewMessage = async (req, res) => {
  const { lastname, firstname, email, telephone, messages } = req.body;
  try {
    const message = await Message.create({
      lastname,
      firstname,
      email,
      telephone,
      messages
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get all message
const getAllMessage = async (req, res) => {
  const message = await Message.find({}).sort({ createdAt: -1 });
  res.status(200).json(message);
};

//get one message
const getMessage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such user" });
  }
  const message = await Message.findById(id);
  if (!message) {
    return res.status(404).json({ error: "No such video" });
  }
  res.status(200).json(message);
};

//delete an webinaire
const deleteMessage = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Message" });
  }
  const message = await Message.findByIdAndDelete(id);
  if (!message) {
    return res.status(404).json({ error: "No Such Message" });
  }
  res.status(200).json(message);
};
module.exports = {
  createNewMessage,
  getAllMessage,
  getMessage,
  deleteMessage,
};
