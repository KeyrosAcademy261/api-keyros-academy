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

//get all videos in one folder
const getVideoOneFolder = async (req, res) => {
  const id = req.params;
  const videoList = [];
  await publitio
    .call("/files/list", "GET", {
      offset: '0',
      limit: '100',
      order:'name:asc',
      folder:`${id}`
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
    .call("/folders/list", "GET", { parent_id: "toqpX0bc", order: "name:asc" })
    .then((response) => FolderList.push(response))
    .catch((error) => console.log(error));
  res.status(200).json(FolderList);
};

//get folder list
const getFolder = async (req, res) => {
  const FolderList = [];
  const { id } = req.params;
  await publitio
    .call("/folders/list", "GET", { parent_id: id, order: "name:asc" })
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

module.exports = {
  getVideos,
  getOneVideo,
  getAllFolder,
  getFolder,
  getVideoOneFolder,
};
