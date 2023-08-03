import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import Heading from '../components/Base/Heading';
import NormalText from '../components/Base/NormalText';
import StandardInput from '../components/Base/StandardInput';
import PrimaryButton from '../components/Base/PrimaryButton';
import SecondaryButton from '../components/Base/SecondaryButton';
import Logo from '../assets/imgs/fml-logo.svg';
import validator from 'validator';
import axios from '../api/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../context/AuthProvider';

const LAWYER_LOGIN_URL = '/lawyers/login';
const CLIENT_LOGIN_URL = '/clients/login';
const ADMIN_LOGIN_URL = '/admins/login';
const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { auth, setAuth } = useContext(AuthContext);

    useEffect(() => {
        if (auth.userType === 'client') {
            navigation.navigate('clientHome');
        }
    }, []);

    const handleSignIn = async () => {

        if (!validator.isEmail(email)) {
            setErrorMessage('Please enter correct email');
        } else if (password.length < 4) {
            setErrorMessage('Please enter correct password');
        } else {
            setErrorMessage('');

            let data = null;

            if (email.includes('@fml.com')) {
                data = await loginAsAdmin();
                await storeCredentials(data);

                return;
            }
            data = await loginAsClient();

            if (!data) {
                data = await loginAsLawyer();
            }
            await storeCredentials(data);
        }

    };

    const storeCredentials = async (data) => {
        if (data) {
            setAuth(data);
            try {
                await AsyncStorage.setItem("@auth", JSON.stringify(data));
            } catch (error) {
                console.log('AsyncStorage Error: ' + error);
            }
            if (data.userType === 'client') {
                navigation.navigate('clientHome');
            } else if (data.userType === 'admin') {
                navigation.navigate('adminDashboard');
            } else if (data.userType === 'lawyer') {
                navigation.navigate('lawyerHome');
            }
        }
    };

    const loginAsClient = async () => {

        try {
            const { data } = await axios.post(CLIENT_LOGIN_URL,
                JSON.stringify({ email: email.toLowerCase(), password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if (data) {
                return data;
            }
        } catch (error) {
            console.log('ERROR: ' + error);
        }
    };

    const loginAsLawyer = async () => {

        try {
            const { data } = await axios.post(LAWYER_LOGIN_URL,
                JSON.stringify({ email: email.toLowerCase(), password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if (data) {
                return data;
            }
        } catch (error) {
            console.log('ERROR: ' + error);
        }
    };

    const loginAsAdmin = async () => {

        const adminId = email.split('@')[0];


        try {
            const { data } = await axios.post(ADMIN_LOGIN_URL,
                JSON.stringify({ adminId: adminId.toLowerCase(), password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if (data) {
                return data;
            }
        } catch (error) {
            console.log('ERROR: ' + error);
        }
    };

    const handleSignUp = async () => {
        navigation.navigate('chooseSignUpOption');
    };

    return (
        <SafeAreaView className='flex-1 bg-neutral'>
            <ScrollView
                contentContainerStyle={{ justifyContent: 'center', flex: 1 }} className='px-5 '
            >

                {/* Header */}
                <View className='justify-center items-center border-b-2 border-primary-600'>
                    <Logo width={100} height={100} />
                    <Heading classNames={'text-primary py-2.5'}>
                        Find My Lawyer
                    </Heading>
                </View>

                <View className='pt-10'>
                    <Heading size={2}>
                        Login
                    </Heading>
                    <NormalText classNames={'text-primary py-1 text-lg'}>
                        Login to existing account or create a new one.
                    </NormalText>
                </View>

                {/* Sign In Form */}
                <View className='py-5'>
                    <StandardInput
                        value={email}
                        onChangeText={(newEmail) => { setEmail(newEmail); }}
                        classNames={'my-2.5'}
                        placeholder={'Email Address'} />
                    <StandardInput
                        value={password}
                        onChangeText={(newPass) => { setPassword(newPass); }}
                        secureTextEntry={true}
                        classNames={'my-2.5'}
                        placeholder={'Password'} />

                    {errorMessage ?
                        <Heading size={6} classNames='text-exception'>{errorMessage}</Heading> :
                        ''
                    }

                    <PrimaryButton
                        onPress={handleSignIn} classNames={`my-5 ${password.length > 5 && email.length > 5 ? '' : 'opacity-90'}`}>
                        Sign In
                    </PrimaryButton>
                </View>

                <Heading size={2} classNames={'text-center text-primary'}>OR</Heading>



                {/* Sign Up Button */}
                <View className='py-5'>
                    <SecondaryButton onPress={handleSignUp}>Sign Up</SecondaryButton>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default LoginScreen;