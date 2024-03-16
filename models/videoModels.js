const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const VideoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
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

module.exports = mongoose.model("Video", VideoSchema);
