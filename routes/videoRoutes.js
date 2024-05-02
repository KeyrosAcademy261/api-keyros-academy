const express = require("express");

const {
  getVideos,
  getOneVideo,
  createNewVideo,
  deleteVideo,
  updateVideo,
  getAllFolder,
  getFolder
} = require("../controler/videoControler");

const router = express.Router();

// get all video
router.get("/videoFolder/:id", getVideos);

//get all folder
router.get("/folder/allFolders", getAllFolder);

//get folder
router.get("/folder/:id", getFolder);


// get single video
router.get("/video/:id", getOneVideo);

//Post a new video
router.post("/", createNewVideo);

//delete a new video
router.delete("/:id", deleteVideo);

//update a workout
router.patch("/:id", updateVideo);

module.exports = router;
