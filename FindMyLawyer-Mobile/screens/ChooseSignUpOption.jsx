import React from 'react';
import { View, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import Heading from '../components/Base/Heading';
import InputLabel from '../components/Base/InputLabel';
import PrimaryButton from '../components/Base/PrimaryButton';
import SecondaryButton from '../components/Base/SecondaryButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


const ChooseSignUpOption = ({ navigation }) => {

    const navigateToLogin = () => {
        navigation.navigate('login');
    };

    const naviateToClientSignUp = () => {
        navigation.navigate('clientSignUp');
    };

    const navigateToLawyerSignUp = () => {
        navigation.navigate('lawyerSignUp');
    };

    return (
        <SafeAreaView className={`relative bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-5' : ''}`}>
            <View className='flex-1'>
                <Image
                    className='w-screen h-screen object-cover absolute top-0 right-0'
                    source={require('../assets/imgs/signup-options-background.png')} />
                <View className=' h-screen bg-primary/80 px-5'>

                    <TouchableOpacity onPress={navigateToLogin} className='py-5'>
                        <MaterialIcons name="arrow-back-ios" size={32} color="white" />
                    </TouchableOpacity>

                    <View className='flex-1 flex-col justify-around'>

                        <View className='py-5'>
                            <Heading classNames={'py-5 text-neutral'}>Find My Lawyer</Heading>
                            <InputLabel classNames={'text-neutral text-lg'}>
                                Finding a Lawyer has never been
                                so easy! You are only few steps away solving your legal issues
                            </InputLabel>
                        </View>

                        <View>
                            <PrimaryButton
                                onPress={naviateToClientSignUp}
                                classNames={'bg-neutral py-4 my-2'} classNameText={'text-primary'}
                            >
                                I need a Lawyer
                            </PrimaryButton>
                            <SecondaryButton
                                onPress={navigateToLawyerSignUp}
                                classNames={'border-neutral py-4 my-2'} classNameText={'text-neutral'}
                            >
                                I am a Lawyer
                            </SecondaryButton>
                        </View>

                    </View>

                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChooseSignUpOption;