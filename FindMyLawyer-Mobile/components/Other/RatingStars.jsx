import { View, Text } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const RatingStars = ({ rating, setRating }) => {

    return (
        <View className="flex-row my-1">
            {[1, 2, 3, 4, 5].map((value, index) => (
                <MaterialIcons
                    onPress={() => setRating(value)}
                    key={value} name='star' key={index} size={24}
                    color={rating >= value ? '#FF9529' : '#B7CC70'} />
            ))}
        </View>
    );
};

export default RatingStars;