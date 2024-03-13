const express = require("express");
const { registerUser } = require("../controllers/userController");
const router = express.Router();
const bcrypt = require("bcrypt.js");

router.post("/register", registerUser)

module.exports = router