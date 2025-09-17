const { Router } = require("express");
const {
  createRestaurent,
  getAllRestaurents,
  getRestaurentById,
  updateRestaurent,
  addReview,
  getReviews,
} = require("../controllers/restaurent.controller");
const router = Router();

router.post("/", createRestaurent);
router.get("/", getAllRestaurents);
router.get("/:restaurantId", getRestaurentById);
router.put("/:restaurantId", updateRestaurent);

router.post("/:restaurantId/reviews", addReview);
router.get("/:restaurantId/reviews", getReviews);

module.exports = router;
