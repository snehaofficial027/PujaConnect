const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const {
  register,
  login,
} = require("../controllers/authController");

// ================= REGISTER =================

router.post("/register", register);

// ================= LOGIN =================

router.post("/login", login);

// ================= GOOGLE LOGIN =================

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
    session: false,
  })
);

// ================= GOOGLE CALLBACK =================

router.get("/test", (req, res) => {
  res.send("AUTH ROUTES WORKING");
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173",
    session: false,
  }),
  (req, res) => {
    console.log("========== GOOGLE CALLBACK ==========");
    console.log("REQ.USER =>", req.user);

    if (!req.user) {
      return res.send("Google Login Failed");
    }

    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET || "secretkey",
      {
        expiresIn: "30d",
      }
    );

    const redirectURL =
      `http://localhost:5173/google-success` +
      `?id=${req.user._id}` +
      `&name=${encodeURIComponent(req.user.name)}` +
      `&email=${encodeURIComponent(req.user.email)}` +
      `&token=${token}`;

    console.log("REDIRECT URL =>");
    console.log(redirectURL);

    return res.redirect(redirectURL);
  }
);

module.exports = router;