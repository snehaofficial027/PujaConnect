const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookingController');
const { getPanditDashboardStats } = require("../controllers/bookingController");

router.post('/create', createBooking);

router.get("/", getAllPandits);

router.get("/pandit-dashboard/:panditId", getPanditDashboardStats);

module.exports = router;