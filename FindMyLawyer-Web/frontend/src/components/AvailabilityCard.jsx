import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';

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

        const res = await axios.put(`/availability/${availabilityData._id}`,
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

        const res = await axios.put(`/availability/${availabilityData._id}`,
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

    const handleStartHourChange = (event) => {
        setStartHours(event.target.value);
    };

    const handleEndHoursChange = (event) => {
        setEndHours(event.target.value);
    };

    return (
        <div className='table-card'>
            <p className='w-2/4 capitalize'>
                {weekday}
            </p>
            <p className='w-full font-medium'>
                <input
                    value={startHours}
                    onChange={handleStartHourChange}
                    type="time" />
            </p>
            <p className='w-full font-medium'>
                <input

                    value={endHours}
                    onChange={handleEndHoursChange}
                    type="time" />
            </p>
            <p className='w-2/4'>
                <button onClick={handleFormSubmit} className='secondary-btn text-sm p-1 mx-1'>Update</button>

                <button onClick={handleDelete} className='secondary-btn text-sm p-1 mx-1'>Delete</button>
            </p>
        </div>
    );
};

export default AvailabilityCard;;