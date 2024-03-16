const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const lectureSchema = new Schema({
  id_user: {
    type: String,
    required: true,
  },
  id_publitio: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Lecture", lectureSchema);
