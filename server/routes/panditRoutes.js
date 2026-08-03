const express = require("express");
const router = express.Router();
const authPandit = require("../middleware/authPandit");

const {
  getAllPandits,
  getPanditById,
} = require("../controllers/panditController");
const {
  updateAvailability,
} = require("../controllers/panditAvailabilityController");

router.get("/", getAllPandits);

router.get("/:id", getPanditById);



router.put(
  "/availability",
  authPandit,
  updateAvailability
);

module.exports = router;