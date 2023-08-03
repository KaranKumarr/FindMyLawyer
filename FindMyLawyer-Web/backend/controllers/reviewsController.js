const Review = require('../models/reviewModel');
const Client = require('../models/clientModel');
const asyncHandler = require("express-async-handler");

// @desc get reviews
// @route GET /api/reviews
// @access private
const getReviews = asyncHandler(async (req, res) => {

    const lawyer = req.lawyer.id;

    if (lawyer) {
        const reviews = await Review.find({ lawyer: lawyer });
        res.status(200).json(reviews);
    } else {
        res.status(400);
        throw new Error("Lawyer not found");
    }

});

// @desc get reviews for clients by lawyer
// @route GET /api/reviews/lawyerId
// @access private
const getReviewsByLaywer = asyncHandler(async (req, res) => {

    const lawyer = req.params.lawyerId;

    if (lawyer) {
        const reviews = await Review.aggregate([
            {
                $lookup: {
                    from: "clients",
                    localField: 'client',
                    foreignField: '_id',
                    as: "client",
                },
            }
        ]);


        let modifiedReviews = [];

        reviews.forEach((review) => {
            if (lawyer === String(review.lawyer)) {

                let modifiedReview = {
                    _id: review._id,
                    name: review.client[0].name,
                    lawyer: review.lawyer,
                    review: review.review,
                    rating: review.rating,
                    createdAt: review.createdAt,
                    updatedAt: review.updatedAt,
                    clientId: review.client[0]._id
                };

                modifiedReviews.push(modifiedReview);
            }


            modifiedReviews = modifiedReviews.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        });

        res.status(200).json(modifiedReviews);
    } else {
        res.status(400);
        throw new Error("Lawyer not found");
    }

});

// @desc create review
// @route POST /api/reviews
// @access private
const createReview = asyncHandler(async (req, res) => {
    const review = await Review.create({
        review: req.body.review,
        rating: req.body.rating,
        lawyer: req.body.lawyer,
        client: req.client.id
    });

    res.status(201).json(review);
});

// @desc get one review
// @route GET /api/review/:id
// @access private
const getSingleReview = asyncHandler(async (req, res) => {
    const review = await Review.findById(req.params.reviewId);

    if (review) {
        res.status(200).json(review);
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

// @desc update review
// @route PUT /api/reviews/:id
// @access private
const updateReview = asyncHandler(async (req, res) => {
    const review = await Review.findByIdAndUpdate(req.params.reviewId, req.body, {
        new: true
    });

    if (review) {
        res.status(200).json(review);
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});

// @desc delete review
// @route DELETE /api/reviews/:id
// @access private
const deleteReview = asyncHandler(async (req, res) => {
    const review = Review.findByIdAndDelete(req.params.id);

    if (review) {
        res.status(200).json({
            reviewId: req.params.id
        });
    } else {
        res.status(404);
        throw new Error('Review not found');
    }
});


module.exports = { getReviews, createReview, getSingleReview, updateReview, deleteReview, getReviewsByLaywer };