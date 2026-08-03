const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

router.post("/", reviewController.addReview);
router.get("/:panditId", reviewController.getPanditReviews);

module.exports = router;