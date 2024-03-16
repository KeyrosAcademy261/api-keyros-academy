const express = require("express");

//controller function
const {
  createNewWebinaire,
  getAllWebinaire,
  getWebinaire,
  updateWebinaire,
  deleteWebinaire
} = require("../controler/webinaireControler");

const router = express.Router()

//create a new webinaire
router.post('/', createNewWebinaire)

//all webinaire route
router.get("/allWebinaire", getAllWebinaire);

//one webinaire route
router.get("/:id", getWebinaire);

//update webinaire route
router.patch('/:id', updateWebinaire)

//delete webinaire route
router.delete('/:id', deleteWebinaire)

module.exports = router;