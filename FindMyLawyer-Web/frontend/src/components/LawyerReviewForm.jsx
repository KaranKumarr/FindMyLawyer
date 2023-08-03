import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import RatingAStar from '../components/RatingAStars';

const REVIEWS_URL = '/reviews';
const LawyerReviewForm = ({ auth, currentLawyer }) => {


    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');


    const handleRatingSubmit = async (e) => {
        e.preventDefault();

        if (rating !== 0 && review !== '') {
            try {
                await axios.post(REVIEWS_URL, {
                    lawyer: currentLawyer._id,
                    rating,
                    review
                }
                    ,
                    {
                        headers: {
                            "Authorization": `Bearer ${auth.token}`,
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    });

                window.location.reload();

            } catch (error) {

                console.log(error);

            }
        }

    };

    return (
        <form onSubmit={handleRatingSubmit} className='flex flex-col gap-2.5 pb-5'>
            <h5 className='text-neutral-contrast font-semibold'>Share Your Review</h5>

            <label className='text-primary-600 font-medium' htmlFor="review">
                Provide Rating
            </label>

            <RatingAStar rating={rating} setRating={setRating} />

            <label className='text-primary-600 font-medium' htmlFor="review">
                Describe Your Experience
            </label>

            <textarea onChange={(e) => { setReview(e.target.value); }} value={review} rows={5} className='standard-input' name="review" id="review"></textarea>

            <button className='w-max primary-btn' type="submit">Submit Review</button>
        </form>
    );
};

export default LawyerReviewForm;