import { Linking, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import Heading from '../components/Base/Heading';
import NormalText from '../components/Base/NormalText';
import SecondaryButton from '../components/Base/SecondaryButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TertiaryButton from '../components/Base/TertiaryButton';
import PrimaryButton from '../components/Base/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LAWYERS_URL = '/lawyers/';
const AdminDashboard = ({ navigation }) => {

    const { auth, setAuth } = useContext(AuthContext);
    const [lawyers, setLawyers] = useState([]);

    const removeLawyerFromList = (lawyerId) => {

        const filteredLawyers = lawyers.filter((lawyer) => {
            if (lawyer.id !== lawyerId) {
                return lawyer;
            }
        });
        setLawyers(filteredLawyers);
    };

    useEffect(() => {

        const fetchLawyers = async () => {
            try {
                const response = await axios.get(LAWYERS_URL);
                const filteredLawyers = response?.data?.filter((lawyer) => {
                    return lawyer.isVerified !== true;
                });
                setLawyers(filteredLawyers);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLawyers();
    
    }, []);

    const logout = async () => {
        setAuth({});
        await AsyncStorage.removeItem("@auth");
        navigation.navigate("login");
    };


    const rejectLawyerApplication = async (lawyer) => {

        try {

            await axios.delete(LAWYERS_URL + lawyer._id,
                {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    }
                });

            removeLawyerFromList(lawyer._id);
        } catch (error) {
            console.log(error);
        }

    };

    const approveLawyerApplication = async (lawyer) => {
        try {

            await axios.put(LAWYERS_URL + lawyer._id,
                {
                    isVerified: true
                },
                {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    }
                });

            removeLawyerFromList(lawyer._id);

        } catch (error) {
            console.log(error);
        }

    };

    const openLicenseInBrowser = (lawyer) => {
        Linking.openURL(lawyer.license);
    };

    return (
        <SafeAreaView className={`bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-7' : ''}`}>

            {/* Header */}
            <View className='flex-row items-center justify-end py-5 px-5'>
                <Heading size={2} classNames={'capitalize flex-1 text-secondary'}>Hi, Admin</Heading>

                <TouchableOpacity
                    onPress={logout}
                    className='relative bg-neutral-contrast/10 p-1.5 rounded-lg'>
                    {/* <Avatar  /> */}
                    <MaterialCommunityIcons size={24} color={'#9FC131'} name='logout-variant' />
                </TouchableOpacity>
            </View>

            <View>
                <View className='mx-5 p-1 rounded-t-lg bg-secondary-a/20 flex-row justify-between border-b-2 border-secondary-a'>
                    <Heading size={6} classNames='w-1/4 text-center border-r-2 border-secondary-a'>
                        Name
                    </Heading>
                    <Heading size={6} classNames='w-1/4 text-center border-r-2 border-secondary-a'>
                        City
                    </Heading>
                    <Heading size={6} classNames='w-1/4 text-center border-r-2 border-secondary-a'>
                        License
                    </Heading>
                    <Heading size={6} classNames='w-1/4 text-center '>
                        Action
                    </Heading>
                </View>
                <FlatList
                    data={lawyers} keyExtractor={(item, index) => item._id}
                    renderItem={({ item, index }) => (
                        <View className='mx-5 p-1 bg-secondary-a/10 border-b flex-row items-center justify-between'>
                            <NormalText classNames={'w-1/4 px-0.5 text-center'}>
                                {item.name}
                            </NormalText>
                            <NormalText classNames={'w-1/4 px-0.5 text-center'}>
                                {item.city}
                            </NormalText>
                            <TouchableOpacity
                                onPress={() => openLicenseInBrowser(item)}
                                className='w-1/4 items-center px-0.5'>
                                <MaterialCommunityIcons
                                    name='download-box-outline'
                                    size={32} color={'#9230C2'}
                                />
                            </TouchableOpacity>
                            <View className='w-1/4 px-0.5'>
                                <SecondaryButton
                                    onPress={() => approveLawyerApplication(item)}
                                    classNames={'px-1 py-1 my-1 border-primary-600'}
                                    classNameText={'text-sm text-primary-600'}
                                >Accept</SecondaryButton>
                                <SecondaryButton
                                    onPress={() => rejectLawyerApplication(item)}
                                    classNames={'px-1 py-1 my-1 border-exception'}
                                    classNameText={'text-sm text-exception'}
                                >Reject</SecondaryButton>
                            </View>
                        </View>
                    )}
                />
            </View>


        </SafeAreaView>
    );
};

export default AdminDashboard;