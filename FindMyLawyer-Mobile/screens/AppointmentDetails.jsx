import { View, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import Heading from '../components/Base/Heading';
import NormalText from '../components/Base/NormalText';
import moment from 'moment';


const getTimeInAmPm = (timing) => {

    let hour = parseInt(timing.split(":")[0]) % 12;
    let timeInAmPm = (hour === 0 ? "12" : hour) + ":" + timing.split(":")[1] + " " + (parseInt(parseInt(timing.split(":")[0]) / 12) < 1 ? "am" : "pm");

    return timeInAmPm;
};

const AppointmentDetails = ({ navigation, route }) => {

    const { appointment, lawyer } = route.params;

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
                                Name
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
                                {lawyer.name}
                            </NormalText>
                        </View>



                        <View className='w-2/4 py-2 pr-2'>
                            <Heading classNames={'text-primary'} size={6}>
                                Status
                            </Heading>
                            <NormalText classNames={'text-sm'}>
                                {appointment.status ? 'Completed' : 'Did not show up'}
                            </NormalText>
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
                                Location
                            </Heading>
                            <NormalText classNames={'text-sm'}>
                                {lawyer.address}
                            </NormalText>
                        </View>
                    </View>

                    <View>
                        <Heading size={3}>Appointment Summary</Heading>
                        <NormalText classNames={'text-sm my-2'}>
                            {appointment.summary}
                        </NormalText>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default AppointmentDetails;