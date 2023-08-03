import { Image, TextInput, SafeAreaView, View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import Heading from '../components/Base/Heading';
import Avatar from '../assets/imgs/user-avatar.svg';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import axios from '../api/axios';
import LawyerCard from '../components/Other/LawyerCard';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LAWYERS_URL = '/lawyers/top';
const ClientHome = ({ navigation }) => {

    const { auth, setAuth } = useContext(AuthContext);

    const [searchInput, setSearchInput] = useState('');
    const [lawyers, setLawyers] = useState([]);
    const [openDropDown, setOpenDropDown] = useState(false);

    useEffect(() => {

        const fetchTopLawyers = async () => {
            try {
                const { data } = await axios.get(LAWYERS_URL,
                    {
                        headers: {
                            "Authorization": `Bearer ${auth.token}`
                        }
                    });

                const lawyers = data.lawyers.slice(0, 8);

                setLawyers(lawyers);

            } catch (e) {
                console.log(e);
            }
        };

        fetchTopLawyers();

    }, [auth.token]);

    const lawyerCardWidth = Dimensions.get('window').width;

    const categoryList = [
        {
            icon: "https://res.cloudinary.com/du43gxrf2/image/upload/v1687454104/accidents_kix1fc.png",
            title: 'Accidents & Injuries'
        },
        {
            icon: "https://res.cloudinary.com/du43gxrf2/image/upload/v1687454193/Bankruptcy_aa4qhy.png",
            title: 'Bankruptcy'
        },
        {
            icon: "https://res.cloudinary.com/du43gxrf2/image/upload/v1687454233/arrest-svgrepo-com_lkdbb4.png",
            title: 'Criminal Defense'
        },
        {
            icon: 'https://res.cloudinary.com/du43gxrf2/image/upload/v1687454427/divorce-person-separate-people-svgrepo-com_grwcl7.png',
            title: 'Divorce'
        },
        {
            icon: 'https://res.cloudinary.com/du43gxrf2/image/upload/v1687454412/buildings-building-construction-estate-svgrepo-com_ssvnlh.png',
            title: 'Estate Planning'
        },
        {
            icon: 'https://res.cloudinary.com/du43gxrf2/image/upload/v1687454706/family-svgrepo-com_jacreq.png',
            title: 'Family Law'
        },
        {
            icon: 'https://res.cloudinary.com/du43gxrf2/image/upload/v1687454711/immigration-immigrant-passport-citizenship-svgrepo-com_v0hpxy.png',
            title: 'Immigration'
        },
        {
            icon: 'https://res.cloudinary.com/du43gxrf2/image/upload/v1687454716/insurance-agency-svgrepo-com_iyvy5r.png',
            title: 'Medical Malpractice'
        },
        {
            icon: 'https://res.cloudinary.com/du43gxrf2/image/upload/v1687454717/medical-svgrepo-com_rqx6ng.png',
            title: 'Property Settlement'
        },
        {
            icon: 'https://res.cloudinary.com/du43gxrf2/image/upload/v1687454720/family-tree-svgrepo-com_kupagu.png',
            title: 'Wills'
        }
    ];

    const searchLawyers = () => {
        if (searchInput.length > 0)
            navigation.navigate('lawyersSearching', { searchQuery: searchInput });
    };

    const logout = async () => {
        setAuth({});
        await AsyncStorage.removeItem("@auth");
        navigation.navigate("login");
    };

    return (
        <SafeAreaView className={`bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-7' : ''}`}>

            <ScrollView>
                {/* Header */}
                <View className='flex-row items-center justify-end py-5 px-5'>
                    <Heading size={2} classNames={'capitalize flex-1 text-secondary'}>Hi, {auth.name}</Heading>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("clientAppointmentHistory")}
                        className='relative bg-neutral-contrast/10 p-1.5 mx-1.5 rounded-lg'>
                        {/* <Avatar  /> */}
                        <MaterialCommunityIcons size={24} color={'#9FC131'} name='clipboard-check-outline' />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={logout}
                        className='relative bg-neutral-contrast/10 p-1.5 rounded-lg'>
                        {/* <Avatar  /> */}
                        <MaterialCommunityIcons size={24} color={'#9FC131'} name='logout-variant' />
                    </TouchableOpacity>
                </View>

                {/* Search */}
                <View className='bg-neutral-contrast/10 rounded-md p-2.5 my-2.5 mx-5 flex-row'>
                    <TextInput
                        onChangeText={(newText) => { setSearchInput(newText); }}
                        className='flex-1 text-base font-semibold pr-2.5'
                        placeholder='Find your desired lawyers' />
                    <TouchableOpacity
                        onPress={searchLawyers}
                    >
                        <Ionicons
                            size={24}
                            name='search'
                            color={'#353935'}
                        />
                    </TouchableOpacity>
                </View>

                <View className='my-2.5 pl-5 flex-1'>

                    <Heading size={3} classNames={'pt-1 pb-5'}>
                        Top Rated Lawyers
                    </Heading>

                    <ScrollView
                        contentContainerStyle={{ flexDirection: 'row', alignItems: 'stretch' }} className='flex-1' horizontal={true}
                    >
                        {lawyers.map((lawyer) => {
                            return (
                                <View style={{ width: ((lawyerCardWidth / 2) - 5) }} className='mr-5' key={lawyer._id}>
                                    <LawyerCard lawyer={lawyer} navigation={navigation} />
                                </View>
                            );
                        })}
                    </ScrollView>

                </View>

                <View className='my-2.5 pl-5 flex-1'>

                    <Heading size={3} classNames={'pt-1 pb-5'}>
                        Top Categories
                    </Heading>

                    <View className='flex-row flex-wrap'>
                        {categoryList?.map((category, i) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSearchInput(category.title);
                                        searchLawyers();
                                    }}
                                    key={i} className='w-1/4 mb-2.5'>
                                    <View className='bg-primary p-1.5 items-center m-2.5 rounded-lg w-14 h-14 justify-center'>
                                        <Image
                                            height={40} width={40}
                                            source={{ uri: category.icon }} />
                                    </View>
                                    <Heading classNames={'text-xs w-20 text-center'} size={6}>{category.title}</Heading>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                </View>

            </ScrollView>

        </SafeAreaView>
    );
};

export default ClientHome;