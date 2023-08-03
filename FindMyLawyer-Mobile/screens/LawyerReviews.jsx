import { View, SafeAreaView, FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React, { useContext, useState, useEffect } from 'react';
import Heading from '../components/Base/Heading';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ReviewsList from '../components/Other/ReviewsList';

const LawyerReviews = () => {

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
        <SafeAreaView className={`bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-7' : ''} `}>


            <View className='py-2.5 px-5'>
                <Heading size={3}>
                    Clients Feedback
                </Heading>
            </View>


            <View className='flex-row justify-center items-center w-max mx-5 p-2 bg-secondary-a bg-opacity-10 rounded-full'>
                <View className='flex-row mx-1'>
                    {(() => {
                        let row = [];
                        for (let i = 0; i < 5; i++) {
                            if (rating > i + 0.5) {
                                row.push(<MaterialIcons name='star' key={i} size={24} color={'#FF9529'} />);
                            } else {
                                row.push(<MaterialIcons name='star' key={i} size={24} color={'#FF9529'} />);
                            }
                        }
                        return row;

                    })()}
                </View>
                <Heading size={6} classNames='flex-row mx-1 text-neutral'>
                    {rating} Rating ({reviews.length})
                </Heading>
            </View>

            <ScrollView className='px-5 my-2.5'>
                <ReviewsList
                    reviews={reviews}
                />
            </ScrollView>

        </SafeAreaView>
    );
};

export default LawyerReviews;