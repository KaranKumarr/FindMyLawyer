import { View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Heading from '../components/Base/Heading';
import TertiaryButton from '../components/Base/TertiaryButton';
import StandardInput from '../components/Base/StandardInput';
import AuthContext from '../context/AuthProvider';
import InputLabel from '../components/Base/InputLabel';
import axios from '../api/axios';
import NormalText from '../components/Base/NormalText';

const LAWYER_URL = '/lawyers';
const LawyerInformation = () => {

    const { auth } = useContext(AuthContext);
    const [lawyer, setLawyer] = useState({
        name: '',
        email: '',
        password: '',
        city: '',
        license: '',
        keywords: [],
        description: '',
        profilePicture: '',
        phone: '',
        address: '',
        isVerified: true
    });
    const [description, setDescription] = useState(lawyer.description);
    const [phone, setPhone] = useState(lawyer.phone);
    const [address, setAddress] = useState(lawyer.address);
    const [categoryTags, setCategoriesTags] = useState(lawyer.keywords);
    const [keyword, setKeyword] = useState('');


    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`${LAWYER_URL}/${auth._id}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${auth.token}`
                        }
                    });
                setLawyer(response.data);
                setDescription(response.data.description);
                setCategoriesTags(response.data.keywords);
                setAddress(response.data.address);
                setPhone(response.data.phone);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();

    }, [auth.token, auth._id]);


    const handleDescriptionUpdate = async () => {
        try {
            await axios.put(`/lawyers/${auth._id}`, { description });
        } catch (error) {
            console.log(error);
        }
    };
    const handlePhoneUpdate = async () => {
        try {
            if (phone.length === 11) {
                await axios.put(`/lawyers/${auth._id}`, { phone });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleAddressUpdate = async () => {
        try {
            await axios.put(`/lawyers/${auth._id}`, { address });
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeywordsUpdate = async () => {
        try {
            await axios.put(`/lawyers/${auth._id}`, { keywords: categoryTags },
                {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    }
                });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const removeKeyword = (index) => {
        const keywords = categoryTags.filter((keyword, i) => {
            return index !== i;
        });
        setCategoriesTags(keywords);
    };

    return (
        <SafeAreaView className={`bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-7' : ''}`}>
            <ScrollView className='px-5' automaticallyAdjustKeyboardInsets={true}>

                <View className='py-2.5'>
                    <Heading size={3}>
                        Modify your personal information
                    </Heading>
                </View>

                <View className='my-1'>
                    <View className='flex-row items-center justify-between'>
                        <InputLabel>
                            Description
                        </InputLabel>
                        <TertiaryButton
                            onPress={handleDescriptionUpdate}
                        >
                            update
                        </TertiaryButton>
                    </View>
                    <StandardInput
                        placeholder={'Describe yourself as an lawyer so that clients can understand you better. (max 300 char)'}
                        multiline={true}
                        numberOfLines={10}
                        classNames={'border rounded-lg p-2 items-start text-xs bg-neutral-contrast/10'}
                        value={description}
                        onChangeText={(desc) => setDescription(desc)}
                    />
                </View>


                <View className='my-1'>
                    <View className='flex-row items-center justify-between'>
                        <InputLabel>
                            Keywords
                        </InputLabel>
                        <TertiaryButton
                            onPress={handleKeywordsUpdate}
                        >
                            update
                        </TertiaryButton>
                    </View>
                    <View className='border rounded-lg p-2 items-start text-xs bg-neutral-contrast/10'>

                        <View className='flex-row flex-wrap'>
                            {categoryTags.map((keyword, index) => {
                                return (<TouchableOpacity
                                    onPress={() => { removeKeyword(index); }}
                                    className='bg-secondary-a rounded-md mb-1 mr-1 px-1 py-0.5'
                                    key={index}>
                                    <NormalText classNames={'text-xs text-neutral'}>{keyword}</NormalText>
                                </TouchableOpacity>);
                            })}
                        </View>

                        <StandardInput
                            multiline={true}
                            onChangeText={(text) => { setKeyword(text); }}
                            onKeyPress={(event) => {
                                if (event.nativeEvent.key == "Enter" && categoryTags.length < 5) {
                                    setCategoriesTags([...categoryTags, keyword]);
                                    setKeyword('');
                                }
                            }}
                            value={keyword}
                            returnKeyType={'next'}
                            classNames={'border-0 text-sm'}
                            numberOfLines={2}
                            multiline={true}
                            placeholder={'Write keywords so clients can find you by your expertise.'}
                            secureTextEntry={true}
                            keyboardType="default"
                        />

                    </View>
                </View>


                <View className='my-1'>
                    <View className='flex-row items-center justify-between'>
                        <InputLabel>
                            Address
                        </InputLabel>
                        <TertiaryButton
                            onPress={handleAddressUpdate}
                        >
                            update
                        </TertiaryButton>
                    </View>
                    <StandardInput
                        value={address}
                        onChangeText={(address) => setAddress(address)}
                        classNames='border rounded-lg p-2 items-start text-xs bg-neutral-contrast/10'
                        placeholder={'abc building, xyz street, 123 city'}
                    />
                </View>


                <View className='my-1'>
                    <View className='flex-row items-center justify-between'>
                        <InputLabel>
                            Phone
                        </InputLabel>
                        <TertiaryButton
                            onPress={handlePhoneUpdate}
                        >
                            update
                        </TertiaryButton>
                    </View>
                    <StandardInput
                        maxLength={11}
                        onChangeText={(num) => { setPhone(num); }}
                        value={phone}
                        inputMode={'tel'}
                        classNames='border rounded-lg p-2 items-start text-xs bg-neutral-contrast/10'
                        placeholder={'Phone (0300-1234567)'}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default LawyerInformation;