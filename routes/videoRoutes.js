const express = require("express");

const {
  getVideos,
  getOneVideo,
  createNewVideo,
  deleteVideo,
  updateVideo,
  getAllFolder,
} = require("../controler/videoControler");

const router = express.Router();

// get all video
router.get("/", getVideos);

//get all folder
router.get("/folders", getAllFolder);

// get single video
router.get("/:id", getOneVideo);

//Post a new video
router.post("/", createNewVideo);

//delete a new video
router.delete("/:id", deleteVideo);

//update a workout
router.patch("/:id", updateVideo);

module.exports = router;
