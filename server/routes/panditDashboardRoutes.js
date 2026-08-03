const express = require("express");
const router = express.Router();
const { getDashboard } = require("../controllers/panditDashboardController");

// :panditId હોવું જરૂરી છે જેથી frontend માંથી મોકલેલું ID પકડાઈ જાય
router.get("/:panditId", getDashboard);
router.get("/", getDashboard);

module.exports = router;