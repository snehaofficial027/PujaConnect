const User = require("../models/User");
const Pandit = require("../models/Pandit");
const Booking = require("../models/Booking");

// ======================================
// Dashboard
// ======================================

exports.getDashboard = async (req, res) => {
  try {
    const User = require("../models/User");
const Pandit = require("../models/Pandit");
const Booking = require("../models/Booking");
    const totalUsers = await User.countDocuments();

    const totalPandits = await Pandit.countDocuments({
      approved: true,
    });

    const pendingPandits = await Pandit.countDocuments({
      approved: false,
    });

    const totalBookings = await Booking.countDocuments();

    const completedBookings = await Booking.find({
  paymentStatus: "Paid",
  status: { $in: ["Accepted", "Completed"] },
});

    const totalRevenue = completedBookings.reduce(
  (sum, booking) =>
    sum + (Number(booking.price || 0) * 0.10),
  0
);
    
const latestBookings = await Booking.find()
  .sort({ createdAt: -1 })
  .limit(5);


    res.json({
      success: true,
      dashboard: {
        totalUsers,
        totalPandits,
        pendingPandits,
        totalBookings,
        totalRevenue,
        latestBookings,
      },
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ======================================
// Get All Users
// ======================================

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });

    const usersWithBookings = await Promise.all(
      users.map(async (user) => {

        const totalBookings = await Booking.countDocuments({
          userId: user._id,
        });

        const totalBookingData = await Booking.find({
          userId: user._id,
          status: {
            $in: ["Accepted", "Completed"],
          },
        });

        const totalBookingAmount = totalBookingData.reduce(
          (sum, booking) => sum + Number(booking.price || 0),
          0
        );

        // NEW
        const lastBooking = await Booking.findOne({
          userId: user._id,
        }).sort({
          createdAt: -1,
        });

        return {
          ...user.toObject(),

          totalBookings,

          totalBookingAmount,

          lastBookingStatus: lastBooking
            ? lastBooking.status
            : "No Booking",

          lastBookingDate: lastBooking
            ? lastBooking.date
            : "-",
        };
      })
    );

    res.json({
      success: true,
      users: usersWithBookings,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Get All Pandits
// ======================================

exports.getAllPandits = async (req, res) => {
  try {
    const pandits = await Pandit.find().sort({
      createdAt: -1,
    });

    const panditsWithStats = await Promise.all(
      pandits.map(async (pandit) => {

        // Total Bookings
        const totalBookings =
          await Booking.countDocuments({
            panditId: pandit._id,
          });

        // Pending
        const pendingBookings =
          await Booking.countDocuments({
            panditId: pandit._id,
            status: "Pending",
          });

        // Completed
        const completedBookings = await Booking.find({
  panditId: pandit._id,
  status: {
    $in: ["Accepted", "Completed"],
  },
});

        // Earnings
        const totalEarnings =
          completedBookings.reduce(
            (sum, booking) =>
              sum + Number(booking.price || 0),
            0
          );

          const adminCommission = totalEarnings * 0.10;
        return {
  ...pandit.toObject(),
  totalBookings,
  completedBookings,
  pendingBookings,
  totalEarnings,
  adminCommission,
};
      })
    );

    res.json({
      success: true,
      pandits: panditsWithStats,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ======================================
// Approve Pandit
// ======================================

exports.approvePandit = async (req, res) => {
  try {

    await Pandit.findByIdAndUpdate(
      req.params.id,
      {
        approved: true,
      }
    );

    res.json({
      success: true,
      message: "Pandit Approved Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ======================================
// Reject Pandit
// ======================================

exports.rejectPandit = async (req, res) => {
  try {
    await Pandit.findByIdAndUpdate(req.params.id, {
      approved: false,
    });

    res.json({
      success: true,
      message: "Pandit Rejected Successfully",
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ======================================
// Deleted Pandit
// ======================================

exports.deletePandit = async (req, res) => {
  try {
    await Pandit.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Pandit Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================================
// Get All Bookings
// ======================================

exports.getAllBookings = async (req, res) => {
  try {

    const bookings = await Booking.find()
      .populate("userId", "name email")
      .populate("panditId", "name email")
      .sort({
        createdAt: -1,
      });

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

// ======================================
// Revenue
// ======================================

exports.getRevenue = async (req, res) => {
  try {

    const completedBookings = await Booking.find({
      paymentStatus: "Paid",
      status: { $in: ["Accepted", "Completed"] },
    }).sort({
      createdAt: -1,
    });

    // Admin 10% Commission
    const totalRevenue = completedBookings.reduce(
      (sum, booking) =>
        sum + Number(booking.price || 0) * 0.10,
      0
    );

    const today = new Date().toDateString();

    const todayRevenue = completedBookings
      .filter(
        booking =>
          new Date(booking.createdAt).toDateString() === today
      )
      .reduce(
        (sum, booking) =>
          sum + Number(booking.price || 0) * 0.10,
        0
      );

    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    const monthlyRevenue = completedBookings
      .filter(booking => {
        const d = new Date(booking.createdAt);

        return (
          d.getMonth() === month &&
          d.getFullYear() === year
        );
      })
      .reduce(
        (sum, booking) =>
          sum + Number(booking.price || 0) * 0.10,
        0
      );

    res.json({
      success: true,
      totalRevenue,
      todayRevenue,
      monthlyRevenue,
      completedBookings,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// ======================================
// Notifications
// ======================================

const Contact = require("../models/Contact");

exports.getNotifications = async (req, res) => {
  try {

    // Latest Pending Pandits
    const pendingPandits = await Pandit.find({
      approved: false,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    // Pending Bookings
    const pendingBookings = await Booking.countDocuments({
  status: "Pending",
});

    // Contact Messages
    const newMessages = await Contact.countDocuments({
  isRead: false,
});

console.log("Pending Pandits:", pendingPandits.length);
console.log("Pending Bookings:", pendingBookings);
console.log("New Messages:", newMessages);

    res.json({
      success: true,

      pendingPanditsCount: pendingPandits.length,

      pendingPandits,

      pendingBookings,

      newMessages,

      total:
        pendingPandits.length +
        pendingBookings +
        newMessages,

    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};