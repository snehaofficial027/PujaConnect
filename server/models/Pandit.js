const mongoose = require("mongoose");

const panditSchema = new mongoose.Schema(
  {
    // Basic
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    // Address
    city: {
      type: String,
      default: "",
    },

    state: {
      type: String,
      default: "",
    },

    // Professional
    experience: {
      type: String,
      default: "",
    },

    qualification: {
      type: String,
      default: "",
    },

    language: {
      type: String,
      default: "",
    },

    specialization: {
      type: String,
      default: "",
    },

    templeName: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
    },

    availablePoojas: [
      {
        type: String,
      },
    ],

    // Profile
    image: {
      type: String,
      default: "",
    },

    about: {
      type: String,
      default: "",
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    // Rating
    rating: {
      type: Number,
      default: 5,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    // Admin
    approved: {
      type: Boolean,
      default: false,
    },

      verified: {
      type: Boolean,
      default: true,
    },

    featured: {
  type: Boolean,
  default: false,
},

    // Availability
    online: {
      type: Boolean,
      default: true,
    },

    availability: {
      type: String,
      default: "Available Today",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Pandit ||
  mongoose.model("Pandit", panditSchema);