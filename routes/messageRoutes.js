const express = require("express");

//controller function
const {
  createNewMessage,
  getAllMessage,
  getMessage,
  deleteMessage,
} = require("../controler/messageControle");

const router = express.Router();

//create a new message
router.post("/newMessage", createNewMessage);

//all message route
router.get("/AllMessages", getAllMessage);

//one message route
router.get("/:id", getMessage);

//delete message route
router.delete("/:id", deleteMessage);

module.exports = router;
