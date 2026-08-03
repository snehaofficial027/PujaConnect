const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Pandit = require("./models/Pandit");

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected for Seeding"))
  .catch((err) => console.log(err));

const importData = async () => {
  try {
    // Delete old data
    await Pandit.deleteMany();

    // Create hashed password
    const hashedPassword = await bcrypt.hash("123456", 10);

    const dummyPandits = [
      {
        name: "Acharya Ramesh Joshi",
        email: "ramesh@pujaconnect.com",
        password: hashedPassword,
        phone: "9876543211",
        city: "Ahmedabad",
        experience: "15 Years",
        language: "Gujarati, Hindi",
        specializations: [
          "Satyanarayan Katha",
          "Griha Pravesh",
          "Ganesh Puja",
        ],
        price: 5100,
        rating: 4.9,
        reviews: 245,
        image: "images/pandits/pandit1.jpg",
        about:
          "Experienced Vedic Pandit with 15 years of expertise in Hindu rituals, weddings, vastu puja and Satyanarayan Katha.",
        verified: true,
approved: true,
online: true,
availability: "Available Today",
      },

      {
        name: "Pandit Harish Vyas",
        email: "harish@pujaconnect.com",
        password: hashedPassword,
        phone: "9876543212",
        city: "Vadodara",
        experience: "10 Years",
        language: "Gujarati, Sanskrit",
        specializations: [
          "Marriage Puja",
          "Navchandi Yagna",
          "Rudrabhishek",
        ],
        price: 3100,
        rating: 4.8,
        reviews: 180,
        image: "images/pandits/pandit2.png",
        about:
          "Specialist in Marriage Rituals, Rudrabhishek and Vedic ceremonies.",
       verified: true,
approved: true,
online: true,
availability: "Available Today",
      },

      {
        name: "Shastri Mukund Pandya",
        email: "mukund@pujaconnect.com",
        password: hashedPassword,
        phone: "9876543213",
        city: "Surat",
        experience: "20 Years",
        language: "Gujarati, Hindi, Sanskrit",
        specializations: [
          "Maha Mrityunjaya Jaap",
          "Pitru Dosh Puja",
          "Navgraha Shanti",
        ],
        price: 7500,
        rating: 5.0,
        reviews: 410,
        image: "images/pandits/pandit3.webp",
        about:
          "Highly experienced Shastri with more than 20 years of spiritual service.",
        verified: true,
approved: true,
online: true,
availability: "Available Today",
      },

      {
        name: "Rajesh Sharma",
        email: "rajesh@pujaconnect.com",
        password: hashedPassword,
        phone: "9876543214",
        city: "Vadodara",
        experience: "12 Years",
        language: "Hindi, Gujarati",
        specializations: [
          "Griha Pravesh",
          "Lakshmi Puja",
          "Office Opening Puja",
        ],
        price: 3500,
        rating: 4.7,
        reviews: 156,
        image: "images/pandits/pandit4.jpg",
        about:
          "Professional Pandit for Housewarming, Lakshmi Puja and Business Opening ceremonies.",
        verified: true,
approved: true,
online: true,
availability: "Available Today",
      },
    ];

    await Pandit.insertMany(dummyPandits);

    console.log("✅ 4 Pandits Seeded Successfully");
    console.log("");
    console.log("============= LOGIN DETAILS =============");
    console.log("Password for ALL Pandits : 123456");
    console.log("");
    console.log("1. ramesh@pujaconnect.com");
    console.log("2. harish@pujaconnect.com");
    console.log("3. mukund@pujaconnect.com");
    console.log("4. rajesh@pujaconnect.com");
    console.log("=========================================");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

importData();