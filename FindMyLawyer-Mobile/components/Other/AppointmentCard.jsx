import { View, Text, Alert } from 'react-native';
import React from 'react';
import Heading from '../Base/Heading';
import SecondaryButton from '../Base/SecondaryButton';
import NormalText from '../Base/NormalText';
import moment from 'moment';



const getTimeInAmPm = (timing) => {

    let hour = parseInt(timing.split(":")[0]) % 12;
    let timeInAmPm = (hour === 0 ? "12" : hour) + ":" + timing.split(":")[1] + " " + (parseInt(parseInt(timing.split(":")[0]) / 12) < 1 ? "am" : "pm");

    return timeInAmPm;
};

const getDifferenceInDate = (appointmentDate) => {

    const today = moment.utc();
    const givenDate = moment(appointmentDate);

    return givenDate.diff(today, "days");
};

const AppointmentCard = ({ appointment, navigation }) => {

    const daysDifference = getDifferenceInDate(appointment.appointmentDate);

    const addInfo = () => {
        if (daysDifference > 0) {
            Alert.alert('Appointment is still pending', 'Please wait till the appointment date arrives and then you can add further information');
        } else {
            navigation.navigate('lawyerAddSummary', { appointment });
        }
    };

    return (
        <View className='my-2 bg-primary/10 p-2 rounded-md'>
            <Heading size={5}>
                {appointment.clientName}
            </Heading>
            <NormalText>
                {appointment.phoneNumber}
            </NormalText>
            <NormalText>
                {getTimeInAmPm(appointment.appointmentTiming)} | {moment(appointment.appointmentDate).format('dddd, DD MMM YY')}
            </NormalText>
            <View className='flex-row'>
                <Heading size={6}>Status: </Heading>
                <NormalText
                    classNames={appointment.status ? 'text-primary' : 'text-secondary-b'}
                >{appointment.status ? 'Complete' : 'Pending'}</NormalText>
            </View>
            <SecondaryButton
                onPress={addInfo}
                classNames={`${daysDifference > 0 ? 'opacity-50' : 'opacity-100'} p-1 mt-2`} classNameText={'text-sm'}>
                Add Info
            </SecondaryButton>
        </View>
    );
};

export default AppointmentCard;