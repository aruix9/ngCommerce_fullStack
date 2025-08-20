const express = require("express")
const getAllUsers = require("./../controllers/user.controller.js")

console.log(getAllUsers)

const router = express.Router();

router.get('/', getAllUsers)

module.exports = router;