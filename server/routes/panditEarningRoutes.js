const express = require("express");
const router = express.Router();

const authPandit = require("../middleware/authPandit");

const {
  getEarnings,
} = require("../controllers/panditEarningController");

router.get("/", authPandit, getEarnings);

module.exports = router;