import { View, SafeAreaView, ScrollView } from 'react-native';
import Checkbox from 'expo-checkbox';
import React, { useContext, useState } from 'react';
import Heading from '../components/Base/Heading';
import NormalText from '../components/Base/NormalText';
import moment from 'moment';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import PrimaryButton from '../components/Base/PrimaryButton';
import StandardInput from '../components/Base/StandardInput';


const getTimeInAmPm = (timing) => {

    let hour = parseInt(timing.split(":")[0]) % 12;
    let timeInAmPm = (hour === 0 ? "12" : hour) + ":" + timing.split(":")[1] + " " + (parseInt(parseInt(timing.split(":")[0]) / 12) < 1 ? "am" : "pm");

    return timeInAmPm;
};


const APPOINTMENT_URL = '/appointments/';
const LawyerAddSummary = ({ navigation, route }) => {

    const { appointment } = route.params;
    const { auth } = useContext(AuthContext);

    const [currentAppointmentStatus, setCurrentAppointmentStatus] = useState(appointment.status);
    const [summary, setSummary] = useState(appointment.summary);
    const [errorMsg, setErrorMsg] = useState('');

    const updateSummary = async () => {
        try {
            await axios.put(APPOINTMENT_URL + appointment._id,
                { summary },
                {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
        } catch (error) {
            console.log(error);
        }
    };


    const changeAppointmentStatus = async () => {
        setCurrentAppointmentStatus(!currentAppointmentStatus);
        try {
            await axios.put(APPOINTMENT_URL + appointment._id,
                { status: !currentAppointmentStatus },
                {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <SafeAreaView className={`bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-7' : ''}`}>
            <ScrollView className='px-5'>

                <View className='my-2'>
                    <Heading size={3}>
                        Appointment Details
                    </Heading>
                    <View className='flex-row flex-wrap'>
                        <View className='w-2/4 py-2 pr-2'>
                            <Heading classNames={'text-primary'} size={6}>
                                Client
                            </Heading>
                            <NormalText classNames={'text-sm'}>
                                {appointment.clientName}
                            </NormalText>
                        </View>

                        <View className='w-2/4 py-2 pr-2'>
                            <Heading classNames={'text-primary'} size={6}>
                                Lawyer
                            </Heading>
                            <NormalText classNames={'text-sm'}>
                                {auth.name}
                            </NormalText>
                        </View>



                        <View className='w-2/4 py-2 pr-2'>
                            <Heading classNames={'text-primary'} size={6}>
                                Status
                            </Heading>
                            <View className='flex-row items-center'>
                                <NormalText classNames={'text-sm mr-1'}>
                                    {currentAppointmentStatus ? 'Completed' : 'Pending'}
                                </NormalText>
                                <Checkbox
                                    color={'#9230C2'}
                                    value={currentAppointmentStatus}
                                    onValueChange={changeAppointmentStatus}

                                />
                            </View>
                        </View>

                        <View className='w-2/4 py-2 pr-2'>
                            <Heading classNames={'text-primary'} size={6}>
                                Timing
                            </Heading>
                            <NormalText classNames={'text-sm'}>
                                {getTimeInAmPm(appointment.appointmentTiming) + ' - ' + moment(appointment.appointmentDate).format('dddd, DD MMM YY')}
                            </NormalText>
                        </View>

                        <View className='w-full py-2 pr-2'>
                            <Heading classNames={'text-primary'} size={6}>
                                Contact
                            </Heading>
                            <NormalText classNames={'text-sm'}>
                                {appointment.phoneNumber}
                            </NormalText>
                        </View>
                    </View>

                    <View>
                        <Heading size={3}>Appointment Summary</Heading>
                        <StandardInput
                            multiline={true}
                            numberOfLines={15}
                            classNames={'border rounded-lg my-2 p-2 items-start text-xs bg-neutral-contrast/10'}
                            value={summary}
                            onChangeText={(text) => setSummary(text)}
                        />
                        <PrimaryButton onPress={updateSummary}>Update</PrimaryButton>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default LawyerAddSummary;