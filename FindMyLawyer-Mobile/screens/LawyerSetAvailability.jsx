import { View, SafeAreaView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Heading from '../components/Base/Heading';
import NormalText from '../components/Base/NormalText';
import SecondaryButton from '../components/Base/SecondaryButton';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import AvailabilityCard from '../components/Other/AvailabilityCard';

const LawyerSetAvailability = () => {


    const { auth } = useContext(AuthContext);
    const [availabilityData, setAvailabilityData] = useState({
        _id: '',
        schedule_days_runs: ['', '', '', '', '', '', ''],
        schedule_start_hours: ['', '', '', '', '', '', ''],
        schedule_end_hours: ['', '', '', '', '', '', '']
    });

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`/availability`, {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    }
                });
                if (response.data.availabilities === null) {
                    const newResponse = await axios.post(`/availability`,
                        {},
                        {
                            headers: {
                                "Authorization": `Bearer ${auth.token}`
                            }
                        });
                    setAvailabilityData(newResponse.data.availabilities);
                } else {
                    setAvailabilityData(response.data.availabilities);
                }

                console.log(availabilityData);
            } catch (error) {
                console.log(error);
            }

        };
        fetchData();
        
        console.log(availabilityData);

    }, [auth]);

    return (
        <SafeAreaView className={`bg-neutral flex-1 ${Platform.OS === 'android' ? 'pt-7' : ''}`}>

            <View className='py-2.5 px-5'>
                <Heading size={3}>
                    Set your available timings
                </Heading>
            </View>

            <View className='px-5'>

                <View className="flex-row bg-primary-700 p-2 rounded-t-md">
                    <Heading classNames={'text-neutral w-1/4 text-center px-1'} size={6}>
                        Weekday
                    </Heading>
                    <Heading classNames={'text-neutral w-1/4 text-center px-1'} size={6}>
                        Start
                    </Heading>
                    <Heading classNames={'text-neutral w-1/4 text-center px-1'} size={6}>
                        End
                    </Heading>
                    <Heading classNames={'text-neutral w-1/4 text-center px-1'} size={6}>
                        Action
                    </Heading>
                </View>


                {
                    availabilityData.schedule_days_runs[0] !== '' ?
                        availabilityData.schedule_days_runs.map((weekday, index) => {
                            return <AvailabilityCard
                                availabilityData={availabilityData} key={index} weekday={weekday}
                                setAvailabilityData={setAvailabilityData} index={index}
                                startHoursData={availabilityData.schedule_start_hours[index]}
                                endHoursData={availabilityData.schedule_end_hours[index]}
                            />;
                        })
                        : <></>
                }

            </View>

        </SafeAreaView>
    );
};

export default LawyerSetAvailability;