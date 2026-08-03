const express = require("express");
const router = express.Router();

const {
  getDashboard,
  getAllUsers,
  getAllPandits,
  approvePandit,
  rejectPandit,
  deletePandit,
  getAllBookings,
  getRevenue,
  getNotifications,
} = require("../controllers/adminController");

// ================= Dashboard =================
router.get("/dashboard", getDashboard);

// ================= Users =================
router.get("/users", getAllUsers);

// ================= Pandits =================
router.get("/pandits", getAllPandits);

router.put(
  "/pandits/:id/approve",
  approvePandit
);

router.put(
  "/pandits/:id/reject",
  rejectPandit
);

router.delete(
  "/pandits/:id",
  deletePandit
);

// ================= Bookings =================
router.get(
  "/bookings",
  getAllBookings
);

// ================= Revenue =================
router.get(
  "/revenue",
  getRevenue
);

// ================= Notifications =================
router.get(
  "/notifications",
  getNotifications
);

module.exports = router;