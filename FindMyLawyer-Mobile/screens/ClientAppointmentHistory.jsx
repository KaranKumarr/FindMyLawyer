import { View, Text, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import moment from 'moment';
import Heading from '../components/Base/Heading';
import NormalText from '../components/Base/NormalText';
import SecondaryButton from '../components/Base/SecondaryButton';
import axios from '../api/axios';
import AppointmentHistoryCard from '../components/Other/AppointmentHistoryCard';

const APPOINTMENTS_URL = '/appointments';
const ClientAppointmentHistory = ({ navigation }) => {

    const { auth } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [futureAppointment, setFutureAppointment] = useState(false);
    const [pastAppointment, setPastAppointment] = useState(false);

    useEffect(() => {

        const fetchAppointments = async () => {
            try {

                const { data } = await axios.get(APPOINTMENTS_URL, {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    }
                });
                setAppointments(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAppointments();

    }, [auth.token]);


    return (
        <SafeAreaView className={`bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-7' : ''}`}>
            <ScrollView className='px-5'>

                <View>
                    <Heading classNames={'my-2'} size={4}>Upcoming Appointment(s)</Heading>
                    <View>
                        {appointments?.map((appointment) => {
                            if (moment().isSameOrBefore(appointment.appointmentDate)) {
                                return (
                                    <AppointmentHistoryCard
                                        auth={auth}
                                        navigation={navigation} appointment={appointment} key={appointment._id} />
                                );
                            };
                        })}

                    </View>


                    <Heading classNames={'my-2'} size={4}>Previous Appointment(s)</Heading>
                    <View>
                        {appointments.map((appointment) => {
                            if (moment().isAfter(appointment.appointmentDate)) {
                                return (
                                    <AppointmentHistoryCard
                                        auth={auth}
                                        navigation={navigation} appointment={appointment} key={appointment._id} />
                                );
                            };
                        })}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default ClientAppointmentHistory;