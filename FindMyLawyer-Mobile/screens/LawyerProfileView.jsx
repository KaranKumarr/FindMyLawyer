import { SafeAreaView, View, Image } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React from 'react';
import Heading from '../components/Base/Heading';
import NormalText from '../components/Base/NormalText';
import TertiaryButton from '../components/Base/TertiaryButton';
import PrimaryButton from '../components/Base/PrimaryButton';
import Fontisto from '@expo/vector-icons/Fontisto';
import ReviewsList from '../components/Other/ReviewsList';
import LawyerReviewForm from '../components/Other/LawyerReviewForm';

const LawyerProfileView = ({ navigation, route }) => {

    const lawyer = route.params.lawyer;

    const [profileImage, setProfileImage] = React.useState(lawyer.profilePicture);
    const [isReadMore, setIsReadMore] = React.useState(false);

    React.useEffect(() => {
        const generateProfilePic = async () => {
            const { url } = await fetch(`https://ui-avatars.com/api/?name=${lawyer.name}&background=9FC131&color=FFFFF0&size=256`);
            setProfileImage(url);
        };

        if (!profileImage)
            generateProfilePic();

    }, [lawyer.name, profileImage]);


    const maxDescLength = 300;

    const DescDisplay = () => {
        const shortLawyerDesc = lawyer.description.length > maxDescLength ? lawyer.description.slice(0, maxDescLength - 1) + "..." : lawyer.description;

        return (
            <View className='pt-1 flex-row'>
                <NormalText classNames='text-sm flex-row'>
                    {isReadMore ? lawyer.description : shortLawyerDesc}...
                    <NormalText
                        onPress={() => setIsReadMore(!isReadMore)}
                        classNames={'text-secondary-b underline'}>
                        read {isReadMore ? 'less' : 'more'}
                    </NormalText>
                </NormalText>
            </View>
        );
    };

    return (
        <SafeAreaView
            className={`bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-7' : ''}`}>
            <ScrollView>

                <View className='items-center flex-1 bg-neutral'>
                    <View className={`w-full px-5 border-b bg-primary/10 border-b-neutral-contrast/20 items-center pt-5`}>
                        <View
                            style={{
                                shadowColor: "#353935",
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3.84,
                                elevation: 5,
                            }}
                            className='bg-primary/10 aspect-square rounded-lg shadow-sm w-2/5'>
                            <Image
                                source={{ uri: profileImage }}
                                className='aspect-square rounded-lg shadow-sm w-full'
                            />
                        </View>
                        <Heading classNames={'pt-4'} size={2}>{lawyer.name}</Heading>
                        <View className='flex-row items-center pb-2'>
                            <Heading classNames={'text-gold pr-1'} size={5}>{lawyer.rating}</Heading>
                            <Fontisto
                                size={16}
                                name='star'
                                color={'#FF9529'}
                            />
                            <NormalText classNames={'text-primary-400 pl-1'} size={6}>({lawyer.count})</NormalText>
                        </View>
                        <PrimaryButton
                            onPress={() => { navigation.navigate("lawyerBookAppointment", { lawyer }); }}
                            classNames={'mb-4 py-0.5'}>
                            Book Appointment
                        </PrimaryButton>
                    </View>

                    <View className='flex-1'>
                        <View className='w-full px-5 py-2'>
                            <Heading size={4} classNames='text-primary'>
                                Description
                            </Heading>
                            <DescDisplay />
                        </View>

                        <View className='w-full px-5 py-2'>
                            <Heading size={4} classNames='text-primary'>
                                Keywords
                            </Heading>
                            <View className='flex-row flex-wrap pt-2'>
                                {lawyer?.keywords.map((keyword, index) => {
                                    return (<View key={index} className='bg-secondary-b rounded-md mr-1 mb-1'>
                                        <NormalText classNames={'text-neutral p-1 text-xs capitilize'}>
                                            {keyword}
                                        </NormalText>
                                    </View>);
                                })}
                            </View>
                        </View>


                        <View className='w-full px-5 py-2'>

                            <Heading size={4} classNames='text-primary'>
                                Location
                            </Heading>
                            <NormalText>{lawyer.address}</NormalText>

                        </View>

                        <View className='w-full px-5 py-2'>

                            <Heading size={4} classNames='text-primary'>
                                Contact
                            </Heading>
                            <NormalText>{lawyer.phone}</NormalText>

                        </View>

                    </View>

                    <View className='w-full px-5 py-2'>
                        <Heading size={4} classNames='text-primary'>
                            Reviews
                        </Heading>

                        <LawyerReviewForm navigation={navigation} lawyer={lawyer} />

                        <ReviewsList reviews={lawyer.reviews} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default LawyerProfileView;