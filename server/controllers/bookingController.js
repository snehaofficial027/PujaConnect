const Booking = require("../models/Booking");
const User = require("../models/User");
const Pandit = require("../models/Pandit");
const {refundPayment} = require("./paymentController");

// ===============================
// Create New Booking
// ===============================
const createBooking = async (req, res) => {
  try {
    console.log("========== BOOKING REQUEST ==========");
    console.log(req.body);
    console.log("=====================================");

    const {
      userId,
      panditId,
      pujaName,
      date,
      timeSlot,
      address,
      pujaMode,
      paymentMethod,
      paymentStatus,
      paymentId,
      orderId,
    } = req.body;

    if (
      !userId ||
      !panditId ||
      !pujaName ||
      !date ||
      !timeSlot ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const pandit = await Pandit.findById(panditId);

    if (!pandit) {
      return res.status(404).json({
        success: false,
        message: "Pandit not found",
      });
    }

    const booking = await Booking.create({
      userId: user._id,
      userName: user.name,

      panditId: pandit._id,
      panditName: pandit.name,

      pujaName,
      date,
      timeSlot,
      address,
      pujaMode,

      paymentId: paymentId || "",
      orderId: orderId || "",

      paymentMethod: paymentMethod ? paymentMethod : "Cash",

      paymentStatus: paymentStatus ? paymentStatus : "Pending",

      price: pandit.price,

      status: "Pending",
    });

    console.log("========== BOOKING SAVED ==========");
    console.log(booking);
    console.log("===================================");

    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      booking,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get User Bookings
// ===============================
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Booking Status
// ===============================
const updateBookingStatus = async (req, res) => {
  try {
    console.log("========== UPDATE BOOKING STATUS ==========");
    console.log("Booking ID:", req.params.bookingId);
    console.log("Status:", req.body.status);

    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Update booking status
    booking.status = status;

    // Refund logic
    if (
      status === "Rejected" &&
      booking.paymentMethod === "Online" &&
      booking.paymentStatus === "Paid"
    ) {
      const refund = await refundPayment(booking.paymentId);

      booking.refundId = refund.id;
      booking.refundStatus = "Refunded";
      booking.paymentStatus = "Refunded";
    }

    // Save changes
    await booking.save();

    console.log("Updated Booking:");
    console.log(booking);

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Admin - Get All Bookings
// ===============================
const getAllBookingsAdmin = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("panditId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Get Bookings For Logged In Pandit
// ===============================
const getPanditBookings = async (req, res) => {
  try {
    const panditId = req.panditId || req.params.panditId;

    // panditId અથવા panditName બંનેમાંથી જે મેચ થાય તે બુકિંગ લાવશે
    const bookings = await Booking.find({
      $or: [
        { panditId: panditId },
        { panditName: req.user?.name || "" }
      ]
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// ⚡ NEW: Get Pandit Dashboard Live Stats
// ===============================
const getPanditDashboardStats = async (req, res) => {
  try {
    const panditId = req.panditId || req.params.panditId;

    // પંડિતના તમામ બુકિંગ શોધો
    const bookings = await Booking.find({
      $or: [
        { panditId: panditId },
        { panditName: req.user?.name || "" }
      ]
    });

    const todayStr = new Date().toISOString().split('T')[0];

    let todayBookings = 0;
    let pending = 0;
    let confirmed = 0; // Accepted / Confirmed
    let completed = 0;
    let earnings = 0;

    bookings.forEach((b) => {
      // Case-insensitive status check (સબ સ્મોલ/કેપિટલ કવર કરવા માટે)
      const status = b.status ? b.status.toLowerCase() : "";

      if (status === "pending") {
        pending++;
      } else if (status === "accepted" || status === "confirmed") {
        confirmed++;
      } else if (status === "completed") {
        completed++;
        earnings += (Number(b.price) || 0);
      }

      if (b.date === todayStr) {
        todayBookings++;
      }
    });

    res.status(200).json({
      success: true,
      dashboard: {
        todayBookings,
        pending,
        confirmed,
        completed,
        earnings,
        totalBookings: bookings.length,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Accept / Reject Booking
// ===============================
const updatePanditBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(bookingId);

if (!booking) {
  return res.status(404).json({
    success: false,
    message: "Booking not found",
  });
}

booking.status = status;

if (
  status === "Completed" &&
  booking.paymentMethod === "Online"
) {
  booking.paymentStatus = "Paid";
}

if (
  status === "Rejected" &&
  booking.paymentMethod === "Online" &&
  booking.paymentStatus === "Paid"
) {
  const refund = await refundPayment(
    booking.paymentId
  );

  booking.refundId = refund.id;
  booking.refundStatus = "Refunded";
  booking.paymentStatus = "Refunded";
}

await booking.save();

return res.json({
  success: true,
  booking,
});

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  updateBookingStatus,
  getAllBookingsAdmin,
  getPanditBookings,
  getPanditDashboardStats,
  updatePanditBookingStatus,
};