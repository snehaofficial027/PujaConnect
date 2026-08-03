const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {
  type: String,
  default: null,
},
  role: { 
    type: String, 
    enum: ['user', 'pandit', 'admin'], 
    default: 'user' 
  },
  isVerified: { type: Boolean, default: false }, // એડમિન વેરિફિકેશન માટે
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);