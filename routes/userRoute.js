const express = require("express");

//controller function
const {
  loginUser,
  signUpUser,
  getAllUsers,
  adminLogin,
  signUpAdmin,
  getUser,
  updateUser,
  deleteUser
} = require("../controler/Controller");

const router = express.Router();

//login route
router.post("/login", loginUser);

//login route
router.post("/admin/login", adminLogin);

//signup route
router.post("/signup", signUpUser);

//signup route
router.post("/admin/signup", signUpAdmin);

//all user route
router.get("/allUser", getAllUsers);

//one user route
router.get("/:id", getUser);

//update user route
router.patch('/:id', updateUser)

//delete user route
router.delete('/:id', deleteUser)

module.exports = router;
