const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// ================= REGISTER =================

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "secretkey",
        {
          expiresIn: "30d",
        }
      ),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= LOGIN =================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
      !user ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET || "secretkey",
        {
          expiresIn: "30d",
        }
      ),
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// ================= GOOGLE LOGIN =================

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          email: profile.emails[0].value,
        });

        if (!user) {
          const randomPassword = await bcrypt.hash(
            Math.random().toString(36),
            10
          );

          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: randomPassword,
            image: profile.photos[0]?.value || "",
          });
        }

       console.log("========== GOOGLE STRATEGY ==========");
console.log(user);
console.log("=====================================");

return done(null, user);

      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = {
  register,
  login,
};