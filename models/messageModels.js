require("dotenv").config();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    requiered: true,
  },
  email: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    requiered: true,
  },
  messages: {
    type: String,
    requiered: true,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
