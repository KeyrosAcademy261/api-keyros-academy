require("dotenv").config();
const Video = require("../models/videoModels");
const mongoose = require("mongoose");
const { publitio } = require("../service/publitio");

// get all videos
const getVideos = async (req, res) => {
  const id = req.params;
  const videoList = [];
  await publitio
    .call("/files/list", "GET", {
      offset: "0",
      limit: "100",
      order: "name:asc",
      folder: id,
    })
    .then((response) => {
      videoList.push(response);
    })
    .catch((error) => console.log(error));
  res.status(200).json(videoList);
};
//get all folder list

const getAllFolder = async (req, res) => {
  const FolderList = [];

  await publitio
    .call("/folders/list", "GET", { parent_id: "toqpX0bc", order: 'name:asc'})
    .then((response) => FolderList.push(response))
    .catch((error) => console.log(error));
  res.status(200).json(FolderList);
};

//get folder list
const getFolder = async (req, res) => {
  const FolderList = [];
  const { id } = req.params;
  await publitio
    .call("/folders/list", "GET", { parent_id:id, order:'name:asc' })
    .then((response) => FolderList.push(response))
    .catch((error) => console.log(error));
  res.status(200).json(FolderList);
};

//get a single video
const getOneVideo = async (req, res) => {
  const { id } = req.params;
  const videoDetails = [];
  await publitio
    .call(`/files/show/${id}`, "GET")
    .then((response) => videoDetails.push(response))
    .catch((error) => console.log(error));
  res.status(200).json(videoDetails);
};

//create a new video
const createNewVideo = async (req, res) => {
  const { title, id_publitio, description, isCompleted } = req.body;

  //add video to db
  try {
    const video = await Video.create({
      title,
      description,
      id_publitio,
      isCompleted,
    });
    res.status(200).json(video);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a video
const deleteVideo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such video" });
  }
  const video = await Video.findOneAndDelete({ _id: id });
  if (!video) {
    res.status(404).json({ error: "No such video" });
  }
  res.status(200).json(video);
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
  getVideos,
  getOneVideo,
  createNewVideo,
  deleteVideo,
  updateVideo,
  getAllFolder,
  getFolder,
};
