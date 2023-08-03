import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import LawyerSignUpForm from '../components/Other/LawyerSignUpForm';
import Heading from '../components/Base/Heading';
import NormalText from '../components/Base/NormalText';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Vector from '../assets/imgs/lawyer-signup-vector.svg';

const LawyerSignUp = ({ navigation }) => {

    const navigateToChooseSignUp = () => {
        navigation.navigate('chooseSignUpOption');
    };

    return (
        <SafeAreaView className={`bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-5' : ''}`}>
            <ScrollView className='flex-1'>

                <TouchableOpacity onPress={navigateToChooseSignUp} className='px-5 py-2.5 my-2.5 border-b-2 border-neutral-contrast'>
                    <MaterialIcons name="arrow-back-ios" size={32} color="#353935" />
                </TouchableOpacity>

                <View className='p-5'>

                    <Heading classNames={'text-center'} size={2}>
                        Setup Your Account
                    </Heading>
                    <NormalText classNames={'text-center'}>Register Yourself As A Lawyer and Get Clients</NormalText>

                    <View className='items-center justify-center py-2.5'>
                        <Vector height={175} />
                    </View>

                    {/* Sign In Form */}
                    <LawyerSignUpForm />

                </View>


            </ScrollView>
        </SafeAreaView>
    );
};

export default LawyerSignUp;