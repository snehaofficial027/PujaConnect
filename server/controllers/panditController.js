const Pandit = require("../models/Pandit");

// Get All Pandits
exports.getAllPandits = async (req, res) => {
  try {
   const pandits = await Pandit.find({
  approved: true,
}).sort({
  createdAt: -1,
});

    res.status(200).json(pandits);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch pandits",
      error: error.message,
    });
  }
};

// Get Single Pandit
exports.getPanditById = async (req, res) => {
  try {
    const pandit = await Pandit.findOne({
  _id: req.params.id,
  approved: true,
});

    if (!pandit) {
      return res.status(404).json({
        message: "Pandit not found",
      });
    }

    res.status(200).json(pandit);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const Pandit = require("../models/Pandit");

    const pandit = await Pandit.findByIdAndUpdate(
      req.panditId,
      {
        online: req.body.online,
        availability: req.body.online
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