const Booking = require("../models/Booking");
const mongoose = require("mongoose");

exports.getDashboard = async (req, res) => {
  try {
    // 🔍 ID મેળવવાના બધા જ રસ્તા સપોર્ટ કરશે
    const rawPanditId =
      req.params.panditId ||
      req.query.panditId ||
      req.panditId ||
      req.user?._id ||
      req.user?.id;

    console.log("-----------------------------------------");
    console.log("REQ PARAMS PANDIT ID:", req.params.panditId);
    console.log("FINAL RESOLVED PANDIT ID:", rawPanditId);

    if (!rawPanditId || rawPanditId === "undefined") {
      return res.status(400).json({
        success: false,
        message: "Pandit ID is required or invalid",
      });
    }

    // String અને ObjectId બંને ફોર્મેટ સપોર્ટ કરશે
    const panditQueryIds = [rawPanditId.toString()];
    if (mongoose.Types.ObjectId.isValid(rawPanditId)) {
      panditQueryIds.push(new mongoose.Types.ObjectId(rawPanditId));
    }

    // 📦 ડેટાબેઝમાંથી પંડિતના બધા બુકિંગ્સ શોધો
    const bookings = await Booking.find({
      panditId: { $in: panditQueryIds },
    });

    console.log("FETCHED BOOKINGS COUNT =", bookings.length);

    // 🎯 Counts Calculate કરો
    const pending = bookings.filter(
      (b) => (b.status || "").toLowerCase() === "pending"
    ).length;

    const confirmed = bookings.filter(
      (b) =>
        (b.status || "").toLowerCase() === "accepted" ||
        (b.status || "").toLowerCase() === "confirmed"
    ).length;

    const completed = bookings.filter(
      (b) => (b.status || "").toLowerCase() === "completed"
    ).length;

    const today = new Date().toISOString().split("T")[0];
    const todayBookings = bookings.filter((b) => {
      if (!b.date) return false;
      const bDate = new Date(b.date).toISOString().split("T")[0];
      return bDate === today;
    }).length;

    // 💰 Earnings Calculation (Accepted, Completed અથવા Paid બુકિંગ્સ માટે)
    const earnings = bookings
      .filter((b) => {
        const st = (b.status || "").toLowerCase();
        const paySt = (b.paymentStatus || "").toLowerCase();
        
        // Rejected અથવા Refunded હોય એ ગણવાના નથી
        if (st === "rejected" || st === "cancelled" || paySt === "refunded") {
          return false;
        }

        return st === "completed" || st === "accepted" || paySt === "paid";
      })
      .reduce((sum, b) => {
        // બુકિંગમાં ભાવ કયા કી-નામથી છે તે બધી શક્યતાઓ ચેક કરશે
        const bookingAmount =
          b.price ||
          b.amount ||
          b.totalPrice ||
          b.pujaPrice ||
          b.rate ||
          0;
        return sum + Number(bookingAmount);
      }, 0);

    // 🎯 Dynamic Data payload (UI Compatibility માટે બધી જ keys ઉમેરી છે)
    const dashboardData = {
      todayBookings,
      todaysBookings: todayBookings,
      pending,
      pendingBookings: pending,
      confirmed,
      accepted: confirmed,
      completed,
      completedBookings: completed,
      earnings,
      totalEarnings: earnings,
      totalBookings: bookings.length,
      totalDevotees: bookings.length, // 右側 Side profile card માટે
    };

    // Response Structure (દરેક પ્રકારના frontend binding માટે safe)
    res.json({
      success: true,
      dashboard: dashboardData,
      data: dashboardData,
    });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};