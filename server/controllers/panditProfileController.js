const Pandit = require("../models/Pandit");
const bcrypt = require("bcryptjs");

const getProfile = async (req, res) => {
  try {
    const pandit = await Pandit.findById(req.panditId).select("-password");

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

const updateProfile = async (req, res) => {
  try {

    const pandit = await Pandit.findById(req.panditId);

    if (!pandit) {
      return res.status(404).json({
        success: false,
        message: "Pandit not found",
      });
    }

    // બધા fields update
    Object.assign(pandit, req.body);

    // Profile Complete
    pandit.profileCompleted = true;

    await pandit.save();

    const updatedPandit = await Pandit.findById(
      req.panditId
    ).select("-password");

    return res.json({
      success: true,
      pandit: updatedPandit,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const uploadPhoto = async (req, res) => {
  try {
    const pandit = await Pandit.findById(req.panditId);

    if (!pandit) {
      return res.status(404).json({
        success: false,
        message: "Pandit not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No Image Selected",
      });
    }

   pandit.image = "/images/pandits/" + req.file.filename;

pandit.profileCompleted = true;

await pandit.save();

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

const changePassword = async (req, res) => {
  try {

    const {
      currentPassword,
      newPassword,
    } = req.body;

    const pandit = await Pandit.findById(req.panditId);

    if (!pandit) {
      return res.status(404).json({
        success: false,
        message: "Pandit not found",
      });
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      pandit.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    pandit.password = hashedPassword;

    await pandit.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadPhoto,
  changePassword,
};