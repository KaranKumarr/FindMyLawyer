import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { RxStarFilled, RxStar } from 'react-icons/rx';
import RatingMeter from '../components/RatingMeter';
import ReviewCard from '../components/ReviewCard';
import axios from '../api/axios';

const LawyerReview = () => {

    const { auth } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);

    useEffect(() => {


        const fetchData = async () => {
            try {
                const response = await axios.get(`/reviews`,
                    {
                        headers: {
                            "Authorization": `Bearer ${auth.token}`
                        }
                    });
                let ratingCount = 0;
                const newReviews = response.data.map((item) => {
                    ratingCount += item.rating;
                    return item;
                });

                setRating((ratingCount / newReviews.length).toPrecision(2));
                setReviews(newReviews);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();

    }, [auth.token]);



    return (
        <main className='bg-primary bg-opacity-10'>
            <main className=' flex w-full  h-max sm:flex-row flex-col py-10 container '>

                <section className='w-full flex-grow sm:w-1/4 my-5 sm:my-0 sm:mr-5 card-board pb-5 flex flex-col justify-around items-center r-h h-full'>

                    <div>
                        <h2 className='text-center px-5 pt-10 pb-5 text-neutral-contrast'>Clients Review</h2>

                        <div className='flex justify-center items-center w-max mx-5 p-2 bg-primary bg-opacity-10 rounded-full'>
                            <span className='flex mx-1'>
                                {(() => {
                                    let row = [];
                                    for (let i = 0; i < 5; i++) {
                                        if (rating > i + 0.5) {
                                            row.push(<RxStarFilled key={i} className='h-5 w-5 ' color={'#FF9529'} />);
                                        } else {
                                            row.push(<RxStar key={i} className='h-5 w-5 ' color={'#FF9529'} />);
                                        }
                                    }
                                    return row;

                                })()}
                            </span>
                            <span className='flex mx-1'>
                                {rating} out of 5
                            </span>
                        </div>

                        <h5 className='py-5 text-neutral-contrast text-opacity-75 text-center'>{reviews.length} clients ratings</h5>

                    </div>

                    <RatingMeter reviews={reviews} />

                </section>

                <section className='w-full sm:w-3/4 my-5 sm:my-0 sm:ml-5 p-10 card-board  r-h h-full'>

                    {reviews.length !== 0 ? reviews.map((item, index) => {
                        return (
                            <ReviewCard clientId={item.client} review={item.review} rating={item.rating} dated={item.updatedAt} />
                        );
                    }) : <div className='flex flex-col h-full items-center justify-center'>
                        <h3 className='text-secondary-b'>You have no reviews yet :(</h3>
                        <p className='text-neutral-contrast'>Please keep up the goodwork and try to get positive review to outshine your competition.</p>
                    </div>}
                </section>

            </main>
        </main>
    );
};

export default LawyerReview;