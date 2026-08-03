const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Folder path
const uploadPath = path.join(
  __dirname,
  "../../client/public/images/pandits"
);

// Folder ન હોય તો બનાવી દો
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

module.exports = multer({ storage });