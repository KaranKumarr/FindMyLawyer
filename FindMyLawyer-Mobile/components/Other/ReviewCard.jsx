import { View, Text, Image } from 'react-native';
import React from 'react';
import axios from '../../api/axios';
import moment from 'moment/moment';
import Heading from '../Base/Heading';
import NormalText from '../Base/NormalText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const ReviewCard = ({ review }) => {

    const date = moment((moment(review.createdAt).format("mm HH DDMMYYYY")), "mm HH DDMMYYYY").fromNow();

    const [profileImage, setProfileImage] = React.useState("");
    const [clientName, setClientName] = React.useState("Anonymous");

    React.useEffect(() => {

        const fetchClientName = async () => {
            try {
                const { data } = await axios.get(`/clients/${review.client}`);
                setClientName(data.name);

            } catch (error) {
                setClientName('Anonymous');
            }
        };
        fetchClientName();

    }, [profileImage, review.client, clientName]);

    return (
        <View className='py-2.5'>
            <View className='flex-row'>
                <View>
                    <Image
                        className='rounded-full'
                        width={60} height={60} source={{ uri: `https://ui-avatars.com/api/?name=${clientName}&background=9230C2&color=FFFFF0&size=256` }} />
                </View>
                <View className='pl-2 items-start flex-1'>
                    <View>
                        <Heading classNames={'capitilize'} size={6}>
                            {clientName}
                        </Heading>
                        <View className='flex-row items-center'>
                            <View className='flex-row pr-2 border-opacity-50  border-r border-neutral-contrast my-1'>
                                {(() => {
                                    let row = [];
                                    for (let i = 0; i < review.rating; i++) {
                                        if (review.rating > i + 0.5) {
                                            row.push(<MaterialIcons name='star' key={i} size={24} color={'#FF9529'} />);
                                        } else {
                                            row.push(<MaterialIcons name='star-outline' key={i} size={24} color={'#FF9529'} />);
                                        }
                                    }
                                    return row;

                                })()}
                            </View>

                            <NormalText classNames={'pl-2 text-sm'}>
                                {date}
                            </NormalText>
                        </View>
                    </View>

                    <View className='bg-neutral-contrast/10 w-full rounded-sm p-2 mt-2'>
                        <NormalText classNames={'text-xs'}>"{review.review}"</NormalText>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default ReviewCard;