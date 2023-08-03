import { View, Text, FlatList } from 'react-native';
import React from 'react';
import ReviewCard from './ReviewCard';

const ReviewsList = ({ reviews }) => {

    return (
        <View class='rounded-md p-2 w-full'>
            <FlatList
                data={reviews}
                keyExtractor={(item, index) => item._id}
                renderItem={({ item, index }) => (
                    <View>
                        <ReviewCard review={item} />
                    </View>
                )}
            />
        </View>
    );
};

export default ReviewsList;