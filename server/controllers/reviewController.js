const Review = require("../models/Review");

// ===============================
// Add Review
// ===============================
exports.addReview = async (req, res) => {
  try {
    console.log("Review Body:", req.body);

    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      review,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===============================
// Get Pandit Reviews
// ===============================
exports.getPanditReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      panditId: req.params.panditId,
    }).sort({ createdAt: -1 });

    const totalReviews = reviews.length;

    let totalRating = 0;

    const breakdown = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    reviews.forEach((review) => {
      totalRating += review.rating;
      breakdown[review.rating]++;
    });

    const averageRating =
      totalReviews === 0
        ? 0
        : Number((totalRating / totalReviews).toFixed(1));

    res.json({
      success: true,
      reviews,
      averageRating,
      totalReviews,
      breakdown,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};