const Restaurent = require("../models/restaurent.model");
const Review = require("../models/review.model");

const createRestaurent = async (req, res, next) => {
  try {
    const { name } = req.body;
    const restaurent = await Restaurent.findOne({ name });
    if (restaurent)
      return res.status(400).json({ error: "Restaurent already exists" });

    const newRest = new Restaurent(req.body);
    await newRest.save();

    res.status(201).json({ msg: "Restaurent created", newRest });
  } catch (error) {
    next(error);
  }
};

const getAllRestaurents = async (req, res, next) => {
  try {
    const { cuisine } = req.query;
    const filter = {};
    if (cuisine) filter.cuisine = cuisine;

    const restaurents = await Restaurent.find(filter);

    res.status(200).json(restaurents);
  } catch (error) {
    next(error);
  }
};

const getRestaurentById = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const restaurent = await Restaurent.findById(restaurantId);
    if (!restaurent)
      return res.status(404).json({ error: "Restaurent not found" });

    res.status(200).json({ restaurent });
  } catch (error) {
    next(error);
  }
};

const updateRestaurent = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const restaurent = await Restaurent.findByIdAndUpdate(
      restaurantId,
      req.body
    );
    if (!restaurent)
      return res.status(404).json({ error: "Restaurent not found" });

    res.status(200).json({ msg: "Restaurent Updated", restaurent });
  } catch (error) {
    next(error);
  }
};

const addReview = async (req, res, next) => {
  try {
    const { text, rating } = req.body;
    const { restaurantId } = req.params;

    const review = await Review.create({
      text,
      rating,
      restaurant: restaurantId,
    });

    const agg = await Review.aggregate([
      { $match: { restaurant: review.restaurant } },
      { $group: { _id: "$restaurent", avgRating: { $avg: "$rating" } } },
    ]);

    await Restaurent.findByIdAndUpdate(restaurantId, {
      averageRating: agg[0]?.avgRating || 0,
    });

    res.status(201).json({ msg: "Review Added", review });
  } catch (error) {
    next(error);
  }
};

const getReviews = async (req, res, next) => {
  try {
    const { restaurantId } = req.params;
    const reviews = await Review.find({ restaurant: restaurantId });
    if (!reviews)
      return res.status(404).json({ error: "Review/Restaurent not found" });

    res.status(200).json({ reviews });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRestaurent,
  getAllRestaurents,
  getRestaurentById,
  updateRestaurent,
  addReview,
  getReviews,
};
