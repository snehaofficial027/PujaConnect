const Pandit = require("../models/Pandit");
const bcrypt = require("bcryptjs");

exports.signupPandit = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      phone,
      city,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !city
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const existingPandit = await Pandit.findOne({
      email,
    });

    if (existingPandit) {
      return res.status(400).json({
        success: false,
        message: "Email already registered.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );
        const pandit = await Pandit.create({

      name,

      email,

      password: hashedPassword,

      phone,

      city,

      experience: "0 Years",

      language: "Gujarati",

      specializations: [],

      price: 0,

      image: "/images/pandits/default-pandit.jpg",

      about:
        "Newly registered Pandit on PujaConnect.",

      rating: 5,

      reviews: 0,

      verified: false,

      approved: false,

      online: false,

      availability: "Pending Approval",

    });

    return res.status(201).json({

      success: true,

      message:
        "Registration successful. Please wait for admin approval.",

      pandit,

    });
      } catch (err) {

    console.error(err);

    return res.status(500).json({

      success: false,

      message: "Internal Server Error",

      error: err.message,

    });

  }

};