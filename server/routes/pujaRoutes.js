const express = require("express");
const router = express.Router();

const {
  getAllPujas,
  getPujaById,
  createPuja,
  deletePuja,
} = require("../controllers/pujaController");

const upload = require("../middleware/upload");

router.get("/", getAllPujas);
router.get("/:id", getPujaById);

// IMPORTANT: image field name = "image"
router.post(
  "/",
  upload.single("image"),
  (req, res, next) => {
    console.log("========== MULTER DEBUG ==========");
    console.log("Content-Type:", req.headers["content-type"]);
    console.log("REQ.FILE:", req.file);
    console.log("REQ.BODY:", req.body);
    console.log("==================================");

    next();
  },
  createPuja
);

router.delete("/:id", deletePuja);

module.exports = router;