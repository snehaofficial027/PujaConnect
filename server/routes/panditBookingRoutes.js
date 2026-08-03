const express = require("express");

const router = express.Router();

const authPandit = require("../middleware/authPandit");

const {
  getPanditBookings,
  confirmBooking,
  rejectBooking,
  completeBooking,
  getNotifications,
} = require("../controllers/panditBookingController");

router.get("/notifications",authPandit,getNotifications);

router.get("/",authPandit,getPanditBookings);

router.put("/:id/confirm",authPandit,confirmBooking);

router.put("/:id/reject",authPandit,rejectBooking);

router.put("/:id/complete",authPandit,completeBooking);

module.exports=router;