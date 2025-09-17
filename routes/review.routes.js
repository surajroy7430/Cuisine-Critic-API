const { Router } = require("express");
const deleteReview = require("../controllers/review.controller");
const router = Router();

router.delete("/:reviewId", deleteReview);

module.exports = router;
