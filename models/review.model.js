const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  text: { type: String, required: true, minlength: 10 },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurent",
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
