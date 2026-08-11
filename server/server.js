const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const panditRoutes = require('./routes/panditRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require("./routes/reviewRoutes");
const panditAuthRoutes = require("./routes/panditAuthRoutes");
const panditDashboardRoutes = require("./routes/panditDashboardRoutes");
const panditBookingRoutes = require("./routes/panditBookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const contactRoutes = require("./routes/contactRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const panditEarningRoutes = require("./routes/panditEarningRoutes");
const panditAvailabilityRoutes = require("./routes/panditAvailabilityRoutes");
const panditProfileRoutes = require("./routes/panditProfileRoutes");
const passport = require("passport");
const session = require("express-session");
const pujaRoutes = require("./routes/pujaRoutes");

const path = require("path");
const app = express();
require("./cron/bookingCron");
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

require("./controllers/authController");

app.use(
  session({
    secret: "pujaconnect",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ⚡ GLOBAL CORS FIX
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://puja-connect-beta.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || origin.startsWith("http://localhost")) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);

// ⚡ FORM DATA & JSON PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🎯 STATIC DIRECTORIES (આ જ અસલી સોલ્યુશન છે)
// 1. Static Public Images
app.use(
  "/images",
  express.static(path.join(__dirname, "public/images"))
);
app.use(
  "/images",
  express.static(path.join(__dirname, "../client/public/images"))
);

// 2. ⚡ Uploaded Images Route (Admin દ્વારા અપલોડ થતી ઈમેજો માટે)
app.use(
  "/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/pandits', panditRoutes);
app.use('/api/bookings', bookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/pandit-auth", panditAuthRoutes);
app.use("/api/pandit-dashboard", panditDashboardRoutes);
app.use("/api/pandit/bookings", panditBookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin-auth", adminAuthRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/pandit/earnings", panditEarningRoutes);
app.use("/api/pandit/availability", panditAvailabilityRoutes);
app.use("/api/pandit/profile", panditProfileRoutes);
app.use("/api/pujas", pujaRoutes);

// Base Route
app.get('/', (req, res) => {
  res.send('PujaConnect Backend API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});