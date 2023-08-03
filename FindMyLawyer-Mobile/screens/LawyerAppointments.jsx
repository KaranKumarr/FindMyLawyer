import { View, SafeAreaView, FlatList } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import React from 'react';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import moment from 'moment';
import Heading from '../components/Base/Heading';
import NormalText from '../components/Base/NormalText';
import PrimaryButton from '../components/Base/PrimaryButton';
import TertiaryButton from '../components/Base/TertiaryButton';
import AppointmentCard from '../components/Other/AppointmentCard';



const LawyerAppointments = ({ navigation }) => {

    const { auth } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);
    const [showToday, setShowToday] = useState(false);


    useEffect(() => {
        if (!showToday) {
            const fetchData = async () => {
                try {
                    const response = await axios.get(`/appointments`,
                        {
                            headers: {
                                "Authorization": `Bearer ${auth.token}`
                            }
                        });
                    setAppointments(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [auth, showToday]);

    const displayAppointmentsForToday = () => {
        if (!showToday) {
            const today = moment().format("DD/MMM/YY");
            let duplicateAppointments = appointments.filter((item) => {
                if (moment(item.appointmentDate).format("DD/MMM/YY") === today) {
                    return item;
                }
            });
            setAppointments([]);
            setAppointments(duplicateAppointments);
            setShowToday(true);
        } else {
            setShowToday(false);
        }

    };

    return (
        <SafeAreaView className={`bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-7' : ''} `}>
            <ScrollView>

                <View className='py-2.5 px-5'>
                    <Heading size={3}>
                        Pending and previous appointments list
                    </Heading>
                </View>

                <View className='my-2 px-5 w-2/4'>
                    <PrimaryButton onPress={displayAppointmentsForToday} classNames={'py-1'}>
                        {showToday ? 'Show All' : 'For Today'}
                    </PrimaryButton>
                </View>

                <View className='px-5'>
                    <FlatList
                        data={appointments}
                        keyExtractor={(item, index) => item._id}
                        renderItem={({ item, index }) => (
                            <AppointmentCard navigation={navigation} appointment={item} />
                        )}
                    />
                </View>

            </ScrollView>

        </SafeAreaView>
    );
};


export default LawyerAppointments;