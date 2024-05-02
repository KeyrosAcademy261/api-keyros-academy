const express = require("express");

const {
  getVideos,
  getOneVideo,
  getAllFolder,
  getFolder,
  getVideoOneFolder,
} = require("../controler/videoControler");

const router = express.Router();

// get all video
router.get("/videoFolder/:id", getVideos);

//get all folder
router.get("/folder/allFolders", getAllFolder);

//get folder
router.get("/folder/:id", getFolder);

//get all videos in one folder
router.get("/videosInFolder/:id", getVideoOneFolder);

// get single video
router.get("/video/:id", getOneVideo);

module.exports = router;
