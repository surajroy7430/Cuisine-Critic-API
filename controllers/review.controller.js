const Review = require("../models/review.model");
const Restaurent = require("../models/restaurent.model");

const deleteReview = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findByIdAndDelete(reviewId);
    if (!review) return res.status(404).json({ error: "Review not found" });

    const agg = await Review.aggregate([
      { $match: { restaurant: review.restaurant } },
      { $group: { _id: "$restaurent", avgRating: { $avg: "$rating" } } },
    ]);

    await Restaurent.findByIdAndUpdate(review.restaurant, {
      averageRating: agg[0]?.avgRating || 0,
    });

    res.status(200).json({ msg: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteReview;
