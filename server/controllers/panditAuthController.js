const Pandit = require("../models/Pandit");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginPandit = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pandit = await Pandit.findOne({ email });

    if (!pandit) {
      return res.status(404).json({
        success: false,
        message: "Pandit not found",
      });
    }

    const isMatch = await bcrypt.compare(password, pandit.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    if (!pandit.approved) {
  return res.status(403).json({
    success: false,
    message: "Your account is waiting for admin approval.",
  });
}

    const token = jwt.sign(
      {
        id: pandit._id,
        role: "pandit",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      success: true,
      token,
      pandit,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};