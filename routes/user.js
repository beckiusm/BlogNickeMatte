const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");

// CREATE USER
router.post("/", userController.createUser);