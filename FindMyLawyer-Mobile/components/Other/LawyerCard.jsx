import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Heading from '../Base/Heading';
import NormalText from '../Base/NormalText';
import Fontisto from '@expo/vector-icons/Fontisto';
import TertiaryButton from '../Base/TertiaryButton';

const LawyerCard = ({ lawyer, navigation }) => {


    const [profileImage, setProfileImage] = useState(lawyer.profilePicture);

    useEffect(() => {
        const generateProfilePic = async () => {
            const { url } = await fetch(`https://ui-avatars.com/api/?name=${lawyer.name}&background=9FC131&color=FFFFF0&size=256`);
            setProfileImage(url);
        };

        if (!profileImage)
            generateProfilePic();

    }, [lawyer.name, profileImage]);

    const goToLawyerProfile = () => {
        if (lawyer._id) {
            navigation.navigate("lawyerProfileView", { lawyer: lawyer });
        }
    };

    return (
        <TouchableOpacity
            onPress={goToLawyerProfile}
            className='border border-r-4 border-b-4 border-neutral-contrast/50 rounded-md py-5 items-center flex-1 drop-shadow-xl'>
            <Image
                className={'rounded-lg mx-2.5'}
                height={100}
                width={100}
                source={{ uri: profileImage }} />
            <Heading classNames={'mt-2.5 px-2 text-center'} size={6} >{lawyer.name}</Heading>
            <View className='flex-row items-center'>
                <Heading classNames={'text-gold pr-1'} size={5}>{lawyer.rating}</Heading>
                <Fontisto
                    size={16}
                    name='star'
                    color={'#FF9529'}
                />
                <NormalText classNames={'text-primary-400 pl-1'} size={6}>({lawyer.count})</NormalText>
            </View>
        </TouchableOpacity>
    );
};


export default LawyerCard;