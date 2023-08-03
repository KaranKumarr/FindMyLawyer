import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../context/AuthProvider';
import Heading from '../components/Base/Heading';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AppointmentsIcon from '../assets/imgs/appointments.svg';
import AvailabilityIcon from '../assets/imgs/availability.svg';
import InformationIcon from '../assets/imgs/information.svg';
import ReviewsIcon from '../assets/imgs/reviews.svg';


const LawyerHome = ({ navigation }) => {

  const { auth, setAuth } = useContext(AuthContext);

  const logout = async () => {
    setAuth({});
    await AsyncStorage.removeItem("@auth");
    navigation.navigate("login");
  };


  return (
    <SafeAreaView className={`bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-7' : ''}`}>
      {/* Header */}
      <View className='flex-row items-center justify-end py-5 px-5'>
        <Heading size={2} classNames={'capitalize flex-1 text-secondary'}>Hi, {auth.name}</Heading>

        <TouchableOpacity
          onPress={logout}
          className='relative bg-neutral-contrast/10 p-1.5 rounded-lg'>
          {/* <Avatar  /> */}
          <MaterialCommunityIcons size={24} color={'#9FC131'} name='logout-variant' />
        </TouchableOpacity>
      </View>

      {/* Main */}

      <View className='flex-1 p-5'>

        <View className='flex-row'>
          <TouchableOpacity
            onPress={() => navigation.navigate('lawyerInformation')}
            className='mr-0.5 mb-0.5 rounded-md aspect-square w-2/4 flex-1 blur-xl bg-neutral-contrast/20 p-2 items-center justify-center flex-col-reverse'>
            <Heading classNames={'text-center'} size={6}>
              Personal Info
            </Heading>
            <InformationIcon height={60} width={60} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('lawyerAppointments')}
            className='ml-0.5 mb-0.5 rounded-md aspect-square w-2/4 flex-1 blur-xl bg-neutral-contrast/20 p-2 items-center justify-center flex-col-reverse'>
            <Heading classNames={'text-center'} size={6}>
              Appointments
            </Heading>

            <AppointmentsIcon height={60} width={60} />
          </TouchableOpacity>
        </View>

        <View className='flex-row'>
          <TouchableOpacity
            onPress={() => navigation.navigate('lawyerSetAvailability')}
            className='mr-0.5 mt-0.5 rounded-md aspect-square w-2/4 flex-1 blur-xl bg-neutral-contrast/20 p-2 items-center justify-center flex-col-reverse'>
            <Heading classNames={'text-center'} size={6}>
              Set Availability
            </Heading>

            <AvailabilityIcon height={60} width={60} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('lawyerReviews')}
            className='ml-0.5 mt-0.5 rounded-md aspect-square w-2/4 flex-1 blur-xl bg-neutral-contrast/20 p-2 items-center justify-center flex-col-reverse'>
            <Heading classNames={'text-center'} size={6}>
              Reviews
            </Heading>

            <ReviewsIcon height={60} width={60} />
          </TouchableOpacity>
        </View>

      </View>

    </SafeAreaView>
  );
};

export default LawyerHome;