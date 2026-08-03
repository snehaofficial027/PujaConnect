const express = require("express");
const router = express.Router();

const { loginPandit } = require("../controllers/panditAuthController");
const { signupPandit } = require("../controllers/panditSignupController");

// ================================
// Pandit Signup
// ================================

router.post("/signup", signupPandit);

// ================================
// Pandit Login
// ================================

router.post("/login", loginPandit);

module.exports = router;