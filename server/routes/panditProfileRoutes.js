const express = require("express");
const router = express.Router();

const auth = require("../middleware/authPandit");
const upload = require("../middleware/upload");

const {
  getProfile,
  updateProfile,
  uploadPhoto,
  changePassword,
} = require("../controllers/panditProfileController");

router.get("/", auth, getProfile);

router.put("/", auth, updateProfile);

router.post(
  "/upload-photo",
  auth,
  upload.single("image"),
  uploadPhoto
);

router.put(
  "/change-password",
  auth,
  changePassword
);

module.exports = router;