const Booking = require("../models/Booking");
const mongoose = require("mongoose");

exports.getEarnings = async (req, res) => {
  try {
    const rawPanditId = req.panditId || req.user?._id || req.user?.id;
    console.log("Logged Pandit ID:", rawPanditId);

    if (!rawPanditId) {
      return res.status(400).json({
        success: false,
        message: "Pandit ID is required",
      });
    }

    // String અને ObjectId બંને ટાઈપને match કરવા માટે
    const panditObjectIds = [rawPanditId.toString()];
    if (mongoose.Types.ObjectId.isValid(rawPanditId)) {
      panditObjectIds.push(new mongoose.Types.ObjectId(rawPanditId));
    }

    // 🎯 1. .populate("pujaId") કાઢી નાખ્યું છે જેથી StrictPopulateError ન આવે
    // 🎯 2. userId ને lean / safe populate કર્યું છે
    const bookings = await Booking.find({
      panditId: { $in: panditObjectIds },
    })
      .populate({ path: "userId", select: "name email phone", strictPopulate: false })
      .sort({ createdAt: -1 });

    console.log(`Found ${bookings.length} bookings for pandit.`);

    // 🎯 3. Flexbile status filter: Accepted, Completed, Confirmed અથવા Paid વાળા બધા ગણાશે
    const validBookings = bookings.filter((b) => {
      const st = (b.status || "").toLowerCase();
      const paySt = (b.paymentStatus || "").toLowerCase();

      // Accepted, Completed કે Confirmed બુકિંગ્સ + જેનું રિફંડ ના થયું હોય
      const isStatusValid =
        st === "accepted" ||
        st === "completed" ||
        st === "confirmed" ||
        paySt === "paid" ||
        paySt === "completed";

      const isNotRefunded = paySt !== "refunded" && st !== "rejected" && st !== "cancelled";

      return isStatusValid && isNotRefunded;
    });

    // Price Extractor
    const getAmount = (b) => {
      return Number(b.price || b.amount || b.totalPrice || b.fees || 0);
    };

    // Calculate Totals
    const totalEarnings = validBookings.reduce((sum, b) => sum + getAmount(b), 0);

    const onlinePayments = validBookings
      .filter((b) => (b.paymentMethod || b.paymentMode || "").toLowerCase() !== "cash")
      .reduce((sum, b) => sum + getAmount(b), 0);

    const cashPayments = validBookings
      .filter((b) => (b.paymentMethod || b.paymentMode || "").toLowerCase() === "cash")
      .reduce((sum, b) => sum + getAmount(b), 0);

    res.json({
      success: true,
      totalEarnings,
      totalBookings: validBookings.length,
      onlinePayments,
      cashPayments,
      bookings: validBookings.map((b) => ({
        ...b._doc,
        devoteeName: b.userName || b.userId?.name || "Devotee",
        pujaName: b.pujaName || "Puja Service",
        amount: getAmount(b),
      })),
    });
  } catch (err) {
    console.error("Earnings Controller Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};