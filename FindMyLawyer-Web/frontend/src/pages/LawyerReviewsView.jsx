import React, { useState, useContext, useEffect } from 'react';
import LawyerProfileHeader from '../components/LawyerProfileHeader';
import ReviewCard from '../components/ReviewCard';
import CurrentLawyerContext from '../context/CurrentLawyerProvider';
import LawyerReviewForm from '../components/LawyerReviewForm';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';



const APPOINTMENTS_URL = '/appointments';
const REVIEWS_URL = '/reviews';
const LawyerReviewsView = () => {

    const { auth } = useContext(AuthContext);
    const [reviews, setReviews] = useState([]);
    const [isReviewAcceptable, setIsReviewAcceptable] = useState(false);


    const { currentLawyer } = useContext(CurrentLawyerContext);

    useEffect(() => {

        const getReviews = async () => {
            try {
                const reviewResponse = await axios.get(`${REVIEWS_URL}/lawyer/${currentLawyer._id}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${auth.token}`
                        }
                    });
                setReviews(reviewResponse.data);

                const appointmentResponse = await axios.get(APPOINTMENTS_URL, {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    }
                });

                console.log(appointmentResponse);

                for (let j = 0; j < appointmentResponse.data.length; j++) {

                    if (appointmentResponse.data[j].lawyer === currentLawyer._id && appointmentResponse.data[j].status === true) {
                        setIsReviewAcceptable(true);

                        if (reviewResponse.data.length > 0) {

                            for (let i = 0; i < reviewResponse.data.length; i++) {

                                if (reviewResponse.data[i].clientId === auth._id) {

                                    setIsReviewAcceptable(false);
                                    break;
                                } else {

                                    setIsReviewAcceptable(true);
                                }
                            }

                        } else {
                            setIsReviewAcceptable(true);
                        }

                    }

                }


            } catch (error) {
                console.log(error);
            }
        };

        getReviews();

    }, [currentLawyer._id, auth]);


    // console.log(reviews);

    return (
        <section className='container py-10 flex flex-col gap-10'>

            <LawyerProfileHeader lawyer={currentLawyer} />

            <main className='p-10 flex flex-col gap-5 bg-primary bg-opacity-20 rounded-lg'>


                {isReviewAcceptable === true ?
                    <LawyerReviewForm auth={auth} currentLawyer={currentLawyer} /> : <></>
                }

                {reviews.map((review) => {
                    return (
                        <ReviewCard dated={review.createdAt} name={review.name} review={review.review} rating={review.rating} key={review._id} />
                    );

                })}

            </main>

        </section>
    );
};

export default LawyerReviewsView;