import { View, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import Heading from '../components/Base/Heading';
import NormalText from '../components/Base/NormalText';
import StandardInput from '../components/Base/StandardInput';
import PrimaryButton from '../components/Base/PrimaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from '../api/axios';
import moment from 'moment';

// URL for getting lawyer availability
const AVAILABILITY_URL = '/availability/lawyer';
// URL for getting booking appointment
const APPOINTMENT_URL = '/appointments';
const LawyerBookAppointment = ({ navigation, route }) => {


    const lawyer = route.params.lawyer;
    const { auth } = useContext(AuthContext);

    const [activeDay, setActiveDay] = useState(0);
    const [activeTime, setActiveTime] = useState(0);
    const [availableTimes, setAvailableTimes] = useState([]);


    const [availability, setAvailability] = useState({
        "schedule_days_runs": [
            "mon",
            "tue",
            "wed",
            "thu",
            "fri",
            "sat",
            "sun"
        ],
        "schedule_start_hours": [
            "09:00",
            "09:00",
            "09:00",
            "09:00",
            "09:00",
            "",
            ""
        ],
        "schedule_end_hours": [
            "17:00",
            "17:00",
            "17:00",
            "17:00",
            "17:00",
            "",
            ""
        ]
    }
    );


    const [startTime, setStartTime] = useState(parseInt(availability.schedule_start_hours[activeDay]));
    const [endTime, setEndTime] = useState(parseInt(availability.schedule_end_hours[activeDay]));

    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [nextWeekday, setNextWeekday] = useState("");


    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.get(
                    `${AVAILABILITY_URL}/${lawyer._id}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${auth.token}`,
                            'Content-Type': 'application/json'
                        },
                        withCredentials: true
                    }
                );

                if (response.data.availabilities)
                    setAvailability(response.data.availabilities);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, [auth.token, lawyer._id, availability.schedule_days_runs]);

    const changeStartAndEndTime = () => {
        setStartTime(parseInt(availability.schedule_start_hours[activeDay]));
        setEndTime(parseInt(availability.schedule_end_hours[activeDay]));
    };

    useEffect(() => {
        const generateTimings = () => {
            let availableTimes = [];
            for (let i = startTime; i < endTime; i++) {
                let a = i + "";
                if (i < 10) {
                    a = "0" + i;
                }
                availableTimes.push(a + ":00");
                availableTimes.push(a + ":30");
            }
            return availableTimes;
        };
        setAvailableTimes(generateTimings());

        // Getting the next date for a given week day
        const desiredWeekday = activeDay === 6 ? 0 : activeDay + 1; // Change weekday flow
        const currentWeekday = moment().isoWeekday(); //Get current Weekday
        const differenceWeekday = (desiredWeekday - currentWeekday); // Get difference b/w desired and current weekday
        const missingDays = differenceWeekday === 0 ? 7 : (differenceWeekday + 7) % 7; // days needed for getting next weekday
        setNextWeekday(moment().add(missingDays, "days")._d);

    }, [activeDay, endTime, startTime]);



    const bookAppointment = async () => {

        try {
            const response = await axios.post(APPOINTMENT_URL,
                {
                    lawyer: lawyer._id,
                    clientName: name,
                    phoneNumber: phoneNumber,
                    appointmentTiming: availableTimes[activeTime],
                    appointmentDate: nextWeekday,
                }, {
                headers: {
                    "Authorization": `Bearer ${auth.token}`,
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (response?.data) {
                navigation.navigate("clientAppointmentHistory");
            }
        } catch (error) {
            console.log(error);
        }

    };




    return (
        <SafeAreaView
            className={`bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-7' : ''}`}>

            <View className='flex-1'>

                {/* Header */}
                <View className=" flex-row items-center border-b border-neutral-contrast/25 pb-2 relative px-8">
                    <TouchableOpacity
                        onPress={() => navigation.navigate("lawyerProfileView", { lawyer: lawyer })}
                        className='px-2 pb-2 absolute flex-1 items-center justify-center'>
                        <Ionicons name='chevron-back' size={20} />
                    </TouchableOpacity>

                    <Heading size={4} classNames={'text-center flex-1'}>{lawyer.name}</Heading>
                </View>

                <View className='flex-1 '>

                    <View className='w-full px-5 py-2'>
                        <Heading size={4} classNames='text-neutral-contrast'>
                            Day
                        </Heading>
                        <View className='flex-row flex-wrap items-center'>
                            {availability.schedule_start_hours.map((startHour, i) => {
                                if (startHour !== "") {
                                    return (
                                        <TouchableOpacity onPress={() => { setActiveDay(i); changeStartAndEndTime(); }}
                                            key={i}
                                            className={`bg-primary/20 py-1 px-1.5 border border-neutral-contrast/60 w-14 mr-2.5 my-2 rounded-lg items-center ${availability.schedule_days_runs[activeDay] === availability.schedule_days_runs[i] ? ' bg-neutral border-neutral-contrast/30' : ''}`}
                                        >
                                            <NormalText
                                                classNames={`text-base text-center text-primary-600 uppercase`}>
                                                {availability.schedule_days_runs[i]}
                                            </NormalText>
                                        </TouchableOpacity>
                                    );
                                } else {
                                    return "";
                                }
                            })}
                            <Heading size={6} classNames='text-secondary-b font-semibold'>Date: {moment(nextWeekday).format("DD-MMM-YYYY")}</Heading>
                        </View>
                    </View>

                    <View className='w-full px-5 py-2'>
                        <Heading size={4} classNames='text-neutral-contrast'>
                            Time Slot
                        </Heading>
                        <ScrollView horizontal={true} className='flex-row'>
                            {availableTimes.map((startHour, i) => {
                                if (startHour !== "") {
                                    return (
                                        <TouchableOpacity onPress={() => { setActiveTime(i); }}
                                            key={i}
                                            className={`bg-primary/20 p-1 border border-neutral-contrast/60 w-20 mr-2 my-2 rounded-lg items-center ${availableTimes[activeTime] === availableTimes[i] ? ' bg-neutral border-neutral-contrast/30' : ''}`}
                                        >
                                            <NormalText
                                                classNames={`text-sm text-center text-primary-600 uppercase`}>
                                                {moment(availableTimes[i], "HH:mm").format("hh:mm:a")}
                                            </NormalText>
                                        </TouchableOpacity>

                                    );
                                } else {
                                    return "";
                                }
                            })}
                        </ScrollView>
                    </View>

                    <View className='w-full px-5 py-2'>

                        <Heading size={4} classNames='text-neutral-contrast'>
                            Personal Information
                        </Heading>

                        <View>
                            <StandardInput
                                onChangeText={(text) => setName(text)}
                                classNames={'mb-1.5'}
                                placeholder={'Your Name'}
                            />
                            <StandardInput
                                onChangeText={(phone) => setPhoneNumber(phone)}
                                classNames={'my-1.5'}
                                placeholder={'Your Phone Number'}
                            />
                            <PrimaryButton
                                onPress={bookAppointment} classNames={'mt-3'}>
                                Book Now
                            </PrimaryButton>
                        </View>

                    </View>


                    <View className='w-full px-5 py-2'>
                        <Heading size={4} classNames='text-neutral-contrast'>
                            Location
                        </Heading>
                        <NormalText>
                            {lawyer.address}
                        </NormalText>
                    </View>


                    <View className='w-full px-5 py-2'>
                        <Heading size={4} classNames='text-neutral-contrast'>
                            Contact
                        </Heading>
                        <NormalText>
                            {lawyer.phone}
                        </NormalText>
                    </View>

                </View>

            </View>

        </SafeAreaView>
    );
};

export default LawyerBookAppointment;