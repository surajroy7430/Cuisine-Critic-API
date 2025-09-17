const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  cuisine: {
    type: String,
    enum: ["Italian", "Mexican", "Indian", "Chinese", "Other"],
    required: true,
  },
  address: { type: String, required: true },
  averageRating: { type: Number, default: 0 },
});

module.exports = mongoose.model("Restaurent", restaurantSchema);
