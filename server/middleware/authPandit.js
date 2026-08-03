const jwt = require("jsonwebtoken");

const authPandit = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Token missing.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (decoded.role !== "pandit") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    req.panditId = decoded.id;

    next();
      } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
      error: error.message,
    });

  }
};

module.exports = authPandit;