const express = require("express");
const router = express.Router();
const { getlastLogin, getlastLoginByUser } = require("../controllers/lastLogin");
// routes for lastLogin
router.get("/", getlastLogin); // get all lastLogin
router.get("/:username", getlastLoginByUser);// get lastLogin by user

module.exports = router;
