const Pandit = require("../models/Pandit");

exports.updateAvailability = async (req, res) => {
  try {
    const { online } = req.body;

    const pandit = await Pandit.findByIdAndUpdate(
  req.panditId,
      {
        online,
        availability: online
          ? "Available Today"
          : "Currently Unavailable",
      },
      { new: true }
    );

    res.json({
      success: true,
      pandit,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};