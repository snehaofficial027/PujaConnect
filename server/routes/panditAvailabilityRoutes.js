const express = require("express");
const router = express.Router();

const authPandit = require("../middleware/authPandit");

const {
  updateAvailability,
} = require("../controllers/panditAvailabilityController");

router.put(
  "/",
  authPandit,
  updateAvailability
);

module.exports = router;