import { View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import NormalText from '../Base/NormalText';
import Heading from '../Base/Heading';
import SecondaryButton from '../Base/SecondaryButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import axios from '../../api/axios';


const AvailabilityCard = ({ weekday, availabilityData, setAvailabilityData, index, endHoursData, startHoursData }) => {

    const { auth } = useContext(AuthContext);


    const [startHours, setStartHours] = useState('');
    const [endHours, setEndHours] = useState('');

    useEffect(() => {
        const changeData = async () => {
            await setStartHours(startHoursData);
            await setEndHours(endHoursData);
        };
        changeData();
    }, [startHoursData, endHoursData]);


    const handleFormSubmit = async () => {

        const duplicateStartHours = availabilityData.schedule_start_hours.map((item, i) => {
            if (i === index) {
                item = startHours;
            }
            return item;

        });
        const duplicateEndHours = availabilityData.schedule_end_hours.map((item, i) => {
            if (i === index) {
                item = endHours;
            }
            return item;
        });


        setAvailabilityData({ ...availabilityData, schedule_days_runs: availabilityData.schedule_days_runs, schedule_start_hours: duplicateStartHours, schedule_end_hours: duplicateEndHours });

        await axios.put(`/availability/${availabilityData._id}`,
            {
                schedule_start_hours: duplicateStartHours,
                schedule_days_runs: availabilityData.schedule_days_runs,
                schedule_end_hours: duplicateEndHours
            },
            {
                headers: {
                    "Authorization": `Bearer ${auth.token}`
                }
            },
        );
    };

    const handleDelete = async () => {
        const duplicateStartHours = availabilityData.schedule_start_hours.map((item, i) => {
            if (i === index) {
                item = '';
            }
            return item;

        });
        const duplicateEndHours = availabilityData.schedule_end_hours.map((item, i) => {
            if (i === index) {
                item = '';
            }
            return item;
        });


        setAvailabilityData({ ...availabilityData, schedule_days_runs: availabilityData.schedule_days_runs, schedule_start_hours: duplicateStartHours, schedule_end_hours: duplicateEndHours });

        await axios.put(`/availability/${availabilityData._id}`,
            {
                schedule_start_hours: duplicateStartHours,
                schedule_days_runs: availabilityData.schedule_days_runs,
                schedule_end_hours: duplicateEndHours
            },
            {
                headers: {
                    "Authorization": `Bearer ${auth.token}`
                }
            },
        );

    };

    const onStartHoursChange = (event, value) => {
        const hours = moment(value).hours();
        const val = hours > 9 ? `${hours}:00` : `0${hours}:00`;
        console.log(val);

        setStartHours(val);
    };

    const onEndHoursChange = (event, value) => {
        const hours = moment(value).hours();
        const val = hours > 9 ? `${hours}:00` : `0${hours}:00`;
        console.log(val);

        setEndHours(val);
    };

    return (
        <View className='bg-secondary-a/10 p-2 flex-row items-center border'>
            <NormalText classNames={'text-neutral-contrast w-1/4 text-center px-1 uppercase'}>
                {weekday}
            </NormalText>
            <Heading size={5} classNames={'text-neutral-contrast w-1/4 text-center px-1'}>
                <DateTimePicker
                    mode='time'
                    onChange={onStartHoursChange}
                    value={(
                        new Date(moment().set("hour",
                            parseInt(startHours.split(':')[0])).set("minutes", 0))
                    )}
                />
                {startHours ? startHours : 'NaN'}
            </Heading>
            <Heading size={5} classNames={'text-neutral-contrast w-1/4 text-center px-1'}>
                <DateTimePicker
                    mode='time'
                    onChange={onEndHoursChange}
                    value={(
                        new Date(moment().set("hour",
                            parseInt(endHours.split(':')[0])).set("minutes", 0))
                    )}
                />
                {endHours ? endHours : 'NaN'}
            </Heading>
            <View className={'w-1/4 px-1 flex-row'}>
                <TouchableOpacity onPress={handleFormSubmit}
                    className='rounded-md p-1 mx-1 bg-primary h-7 w-7 justify-center items'>
                    <MaterialIcons size={20} color={'#FFFFF0'} name='done' />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}
                    className='rounded-md p-1 mx-1 bg-exception h-7 w-7 justify-center items'>
                    <MaterialIcons size={20} color={'#FFF'} name='delete' />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default AvailabilityCard;