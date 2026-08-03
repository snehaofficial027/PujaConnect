const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./models/Admin");

mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  try {

    await Admin.deleteMany();

    const password = await bcrypt.hash(
      "Admin@123",
      10
    );

    await Admin.create({
      name: "Administrator",
      email: "admin@pujaconnect.com",
      password,
    });

    console.log("Admin Created");

    process.exit();

  } catch (err) {

    console.log(err);

    process.exit();

  }
};

seedAdmin();