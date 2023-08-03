import { View, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Heading from '../components/Base/Heading';
import NormalText from '../components/Base/NormalText';
import StandardInput from '../components/Base/StandardInput';
import PrimaryButton from '../components/Base/PrimaryButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from '../api/axios';


const SIGNUP_URL = '/clients';
const ClientSignUp = ({ navigation }) => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [name, setName] = React.useState('');

    const navigateToChooseSignUp = () => {
        navigation.navigate('chooseSignUpOption');
    };

    const handleSignUp = async () => {

        try {
            const { data } = await axios.post(SIGNUP_URL,
                JSON.stringify({ email: email.toLowerCase(), password, name: name.toLowerCase() }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if (data.token && data.userType === 'client') {
                navigation.navigate('login');
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <SafeAreaView className={`bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-5' : ''}`}>
            <TouchableOpacity onPress={navigateToChooseSignUp} className='px-5 py-2.5 my-2.5 border-b-2 border-neutral-contrast'>
                <MaterialIcons name="arrow-back-ios" size={32} color="#353935" />
            </TouchableOpacity>

            <View className='p-5'>
                <Heading size={2} classNames={'text-primary'} >Create your account</Heading>
                <NormalText>Sign up and find lawyers that best suit your needs</NormalText>
                <View className='items-center justify-center py-2.5'>
                    <Image className='w-52 h-52' source={require('../assets/imgs/client-signup-vector.png')} />
                </View>

                {/* Sign In Form */}
                <View>
                    <StandardInput
                        value={name}
                        onChangeText={(newName) => { setName(newName); }}
                        classNames={'my-2.5'}
                        placeholder={'Name'} />
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
                    <StandardInput
                        value={confirmPassword}
                        onChangeText={(newPass) => { setConfirmPassword(newPass); }}
                        secureTextEntry={true}
                        classNames={'my-2.5'}
                        placeholder={'Confirm Password'} />
                    <PrimaryButton
                        onPress={handleSignUp} classNames={`my-5 ${password.length > 5 && email.length > 5 ? '' : 'opacity-90'}`}>
                        Sign In
                    </PrimaryButton>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default ClientSignUp;