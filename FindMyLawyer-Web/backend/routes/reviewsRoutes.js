const {
    getReviews,
    getSingleReview,
    createReview,
    deleteReview,
    updateReview,
    getReviewsByLaywer
} = require("../controllers/reviewsController");
const { protect } = require("../middleware/authMiddleware");
const router = require('express').Router();

router.route('/').get(protect, getReviews).post(protect, createReview);

router.route('/:reviewId').get(protect, getSingleReview).delete(protect, deleteReview).put(protect, updateReview);

router.route('/lawyer/:lawyerId').get(protect, getReviewsByLaywer);

module.exports = router;