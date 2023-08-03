import { View, Text, Image } from 'react-native';
import React from 'react';
import moment from 'moment';
import axios from '../../api/axios';
import Heading from '../Base/Heading';
import NormalText from '../Base/NormalText';
import SecondaryButton from '../Base/SecondaryButton';


const getTimeInAmPm = (timing) => {

    let hour = parseInt(timing.split(":")[0]) % 12;
    let timeInAmPm = (hour === 0 ? "12" : hour) + ":" + timing.split(":")[1] + " " + (parseInt(parseInt(timing.split(":")[0]) / 12) < 1 ? "am" : "pm");

    return timeInAmPm;
};

const LAWYER_URL = '/lawyers/';
const AppointmentHistoryCard = ({ navigation, auth, appointment }) => {

    const [lawyer, setLawyer] = React.useState({});

    React.useEffect(() => {

        const fetchLawyer = async () => {

            try {
                const { data } = await axios.get(LAWYER_URL + appointment.lawyer, {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    }
                });
                setLawyer(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }

        };

        fetchLawyer();
    }, [appointment.lawyer, auth.token]);

    const cancelAppointment = async () => {

        try {
            const res = await axios.delete('appointments/' + appointment._id, {
                headers: {
                    "Authorization": `Bearer ${auth.token}`
                }
            });

            if (res.status === 200) {
                navigation.navigate('clientHome');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const viewDetail = () => {
        navigation.navigate('appointmentDetails', {
            lawyer, appointment
        });
    };

    return (
        <View className='my-2 bg-primary/10 p-2 rounded-md'>
            <View className='flex-row items-center '>

                <Image
                    height={75}
                    width={75}
                    className='rounded-md'
                    source={{
                        uri: lawyer.profilePicture
                    }} />

                <View className='px-2'>
                    <Heading size={5}>{lawyer.name}</Heading>
                    <NormalText classNames={'text-sm'}>
                        {getTimeInAmPm(appointment.appointmentTiming)} | {moment(appointment.appointmentDate).format('dddd, DD MMM YY')}
                    </NormalText>
                    <NormalText classNames={'text-sm'}>
                        {lawyer.address}
                    </NormalText>
                </View>

            </View>
            {
                appointment.status ?
                    (<SecondaryButton
                        onPress={viewDetail}
                        classNames={'mt-2 py-1.5'} classNameText={'text-sm'}>
                        View Details
                    </SecondaryButton>) : <SecondaryButton
                        onPress={cancelAppointment}
                        classNames={'mt-2 py-1.5'} classNameText={'text-sm'}>
                        Cancel Appointment
                    </SecondaryButton>
            }
        </View>
    );
};

export default AppointmentHistoryCard;