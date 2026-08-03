const Booking = require("../models/Booking");
const { refundPayment } = require("./paymentController");

// ========================================
// Get All Bookings of Logged In Pandit
// ========================================

exports.getPanditBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      panditId: req.panditId,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ========================================
// Confirm Booking
// ========================================

exports.confirmBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {

      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });

    }

    booking.status = "Accepted";

    await booking.save();

    res.json({
      success: true,
      booking,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ========================================
// Reject Booking + Refund
// ========================================

exports.rejectBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {

      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });

    }

    console.log("========== REJECT ==========");
    console.log(booking.paymentMethod);
    console.log(booking.paymentStatus);
    console.log(booking.paymentId);

    if (
      booking.paymentMethod === "Online" &&
      booking.paymentStatus === "Paid"
    ) {

      const refund = await refundPayment(
        booking.paymentId
      );

      booking.paymentStatus = "Refunded";

      booking.refundStatus = "Refunded";

      booking.refundId = refund.id;

      console.log("Refund Success");
      console.log(refund);

    }

    booking.status = "Rejected";

    await booking.save();

    res.json({
      success: true,
      message: "Booking Rejected",
      booking,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// ========================================
// Complete Booking
// ========================================

exports.completeBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {

      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });

    }

    booking.status = "Completed";

    await booking.save();

    res.json({
      success: true,
      booking,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }

};

// ========================================
// Get Notification Bookings
// ========================================

exports.getNotifications = async (req, res) => {
  try {

    const bookings = await Booking.find({
      panditId: req.panditId,
      status: "Pending",
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      bookings,
      count: bookings.length,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};