const mongoose = require("mongoose");

const pujaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

   image: {
  type: String
},

    duration: {
      type: String,
      default: "2 - 3 Hours",
    },

    bestTime: {
      type: String,
      default: "",
    },

    benefits: {
      type: [String],
      default: [],
    },

    samagri: {
      type: [String],
      default: [],
    },

    faqs: {
      type: [
        {
          question: String,
          answer: String,
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Puja", pujaSchema);