const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database Error: ${error.message}`);
    process.exit(1); // જો કનેક્શન ફેલ થાય તો સર્વર બંધ થઈ જશે
  }
};

module.exports = connectDB;