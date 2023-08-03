import { View, Text } from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import PrimaryButton from '../Base/PrimaryButton';
import Heading from '../Base/Heading';
import NormalText from '../Base/NormalText';
import StandardInput from '../Base/StandardInput';
import RatingStars from './RatingStars';
import axios from '../../api/axios';

const APPOINTMENTS_URL = '/appointments';
const REVIEWS_URL = '/reviews';
const LawyerReviewForm = ({ navigation, lawyer }) => {

    const { auth } = useContext(AuthContext);
    const [isReviewAcceptable, setIsReviewAcceptable] = useState(false);
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    useEffect(() => {
        const getReviews = async () => {
            try {
                const reviewResponse = await axios.get(`${REVIEWS_URL}/lawyer/${lawyer._id}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${auth.token}`
                        }
                    });
                const appointmentResponse = await axios.get(APPOINTMENTS_URL, {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    }
                });
                for (let j = 0; j < appointmentResponse.data.length; j++) {
                    if (appointmentResponse.data[j].lawyer === lawyer._id && appointmentResponse.data[j].status === true) {
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
    }, [lawyer._id, auth]);

    const handleRatingSubmit = async () => {
        if (rating !== 0 && review !== '') {
            try {
                const data = await axios.post(REVIEWS_URL, {
                    lawyer: lawyer._id,
                    rating,
                    review
                },
                    {
                        headers: {
                            "Authorization": `Bearer ${auth.token}`,
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    });

                navigation.navigate('clientHome');

            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <View>
            {isReviewAcceptable === true ? (

                <View className='flex flex-col my-2'>
                    <Heading size={6}>Share Your Review</Heading>

                    <NormalText className='text-primary-600 my-1'>
                        Provide Rating
                    </NormalText>

                    <RatingStars rating={rating} setRating={setRating} />

                    <NormalText className='text-primary-600 my-1'>
                        Describe Your Experience
                    </NormalText>

                    <StandardInput
                        onChangeText={(text) => setReview(text)}
                        multiline={true}
                        numberOfLines={4}
                        classNames={'h-28 bg-neutral-contrast/10 rounded-md my-2 text-sm'}
                    />

                    <PrimaryButton
                        onPress={handleRatingSubmit}
                        className='w-max my-1'>Submit Review</PrimaryButton>
                </View>
            ) : <></>}
        </View>
    );
};

export default LawyerReviewForm;