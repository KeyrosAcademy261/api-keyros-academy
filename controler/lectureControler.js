require("dotenv").config();
const Lecture = require("../models/lectureModels");
const mongoose = require("mongoose");


//get a single video
const getLeture = async (req, res) => {
  const { id_user } = req.params;
  const lecture = await Lecture.findById(id_user);
  if (!lecture) {
    return res.status(404).json({ error: "No such lecture" });
  }
  res.status(200).json(lecture);
};

//set new lecture
const SetLecture = async (req, res) => {
  const {id_user, id_publitio, isCompleted } = req.body;
  //add video to db
  try {
    const video = await Video.create({
      id_user,
      id_publitio,
      isCompleted,
    });
    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//update a Video
const updateVideo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such video" });
  }
  const video = await Video.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!video) {
    res.status(404).json({ error: "No such video" });
  }
  res.status(200).json(video);
};

module.exports = {
    getLeture,
    SetLecture,
    updateVideo
};
