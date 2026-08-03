const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
 userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
},

userName: {
  type: String,
  required: true,
},

panditId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Pandit",
  required: true,
},

panditName: {
  type: String,
  required: true,
},

orderId: {
  type: String,
},

paymentId: {
  type: String,
  default: "",
},

paymentStatus: {
  type: String,
  default: "Pending",
},

paymentMethod: {
  type: String,
  enum: ["Online", "Cash"],
  default: "Cash",
},

  pujaName: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  timeSlot: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  pujaMode: {
    type: String,
    enum: ["Home Puja", "Temple Puja", "Online Puja"],
    default: "Home Puja",
  },

  refundId: {
  type: String,
  default: "",
},

refundStatus: {
  type: String,
  default: "Not Required",
},

 status: {
  type: String,
  enum: [
    "Pending",
    "Accepted",
    "Rejected",
    "Completed",
    "Cancelled",
  ],
  default: "Pending",
},

  price: {
    type: Number,
    default: 2500,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);