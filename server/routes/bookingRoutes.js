const express = require('express');
const router = express.Router();
const authPandit = require("../middleware/authPandit");
const {
  createBooking,
  getUserBookings,
  updateBookingStatus,
  getAllBookingsAdmin,
  getPanditBookings,
  updatePanditBookingStatus,
} = require("../controllers/bookingController");

router.post('/create', createBooking);
router.get('/user/:userId', getUserBookings);
router.put('/update-status/:bookingId', updateBookingStatus); // ⚡ સ્ટેટસ અપડેટ રાઉટ
router.get('/admin/all', getAllBookingsAdmin); // ⚡ એડમિન ઓલ બુકિંગ્સ રાઉટ
router.get(
  "/pandit",
  authPandit,
  getPanditBookings
);

router.put(
  "/pandit/:bookingId",
  authPandit,
  updatePanditBookingStatus
);

module.exports = router;