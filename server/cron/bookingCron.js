const cron = require("node-cron");
const Booking = require("../models/Booking");

cron.schedule("59 23 * * *", async () => {
  try {

    console.log("AUTO COMPLETE START");

    const today = new Date().toISOString().split("T")[0];

    const bookings = await Booking.find({
      date: today,
      status: "Accepted",
    });

    console.log("Bookings Found :", bookings.length);

    for (const booking of bookings) {

      booking.status = "Completed";

      booking.paymentStatus = "Paid";

      await booking.save();

      console.log("Completed :", booking._id);

    }

    console.log("AUTO COMPLETE FINISHED");

  } catch (err) {

    console.log(err);

  }
});