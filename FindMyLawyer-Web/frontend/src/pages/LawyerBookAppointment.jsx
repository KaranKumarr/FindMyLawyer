import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import LawyerProfileHeader from '../components/LawyerProfileHeader';
import CurrentLawyerContext from '../context/CurrentLawyerProvider';
import moment from 'moment';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

// URL for getting lawyer availability
const AVAILABILITY_URL = '/availability/lawyer';
// URL for getting booking appointment
const APPOINTMENT_URL = '/appointments';
const LawyerBookAppointment = () => {


    const navigate = useNavigate();

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

    const { currentLawyer } = useContext(CurrentLawyerContext);
    const { auth } = useContext(AuthContext);

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.get(
                    `${AVAILABILITY_URL}/${currentLawyer._id}`,
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

    }, [auth.token, currentLawyer._id, availability.schedule_days_runs]);


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

    const bookAppointment = async (e) => {

        e.preventDefault();

        try {
            const response = await axios.post(APPOINTMENT_URL,
                {
                    lawyer: currentLawyer._id,
                    clientName: name,
                    phoneNumber: phoneNumber,
                    appointmentTiming: availableTimes[activeTime],
                    appointmentDate: nextWeekday,
                }
                ,
                {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
            if (response?.data) {
                navigate('/history');
            }
        } catch (error) {
            console.log(error);
        }

    };


    return (
        <section className='container flex flex-col gap-10 py-10'>

            <LawyerProfileHeader lawyer={currentLawyer} />

            <main className='p-5 flex flex-col gap-5 bg-primary bg-opacity-20 rounded-lg text-neutral-contrast'>

                <div className='flex flex-col gap-2.5'>
                    <h5>Day</h5>
                    <div className='flex flex-wrap items-center gap-5'>
                        {availability.schedule_start_hours.map((startHour, i) => {
                            if (startHour !== "") {
                                return (
                                    <span onClick={() => { setActiveDay(i); changeStartAndEndTime(); }}
                                        key={i}
                                        className={availability.schedule_days_runs[activeDay] === availability.schedule_days_runs[i] ? 'slot-box-active' : 'slot-box'}>
                                        {availability.schedule_days_runs[i]}
                                    </span>
                                );
                            } else {
                                return "";
                            }
                        })}
                        <h5 className='text-secondary-b font-semibold'>Date: {moment(nextWeekday).format("DD-MMM-YYYY")}</h5>
                    </div>
                </div>

                <div className='flex flex-col gap-2.5'>
                    <h5>Time Slot</h5>
                    <div className='flex flex-wrap gap-5'>
                        {availableTimes.map((startHour, i) => {
                            if (startHour !== "") {
                                return (
                                    <span
                                        onClick={() => { setActiveTime(i); }}
                                        key={i}
                                        className={` ${availableTimes[activeTime] === availableTimes[i] ? 'slot-box-active' : 'slot-box'} w-24`}>
                                        {moment(availableTimes[i], "HH:mm").format("hh:mm:a")}
                                    </span>
                                );
                            } else {
                                return "";
                            }
                        })}
                    </div>
                </div>


                <div className='flex flex-col gap-2.5 w-3/5'>
                    <h5>
                        Personal Information
                    </h5>
                    <form onSubmit={bookAppointment} className='flex items-center w-full gap-5'>
                        <input
                            value={name} onChange={(e) => { setName(e.target.value); }}
                            required className='standard-input w-2/5' type="text" placeholder='Name' />
                        <input
                            value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value); }}
                            minLength={11}
                            maxLength={11}
                            required className='standard-input w-2/5' type="tel" placeholder='Phone (0312-3456789)' />
                        <button className='primary-btn w-1/5' type="submit">Book Now</button>
                    </form>
                </div>

                <div className='flex flex-col gap-2.5'>
                    <h5>
                        Address
                    </h5>
                    <p className='text-neutral-contrast'>
                        Building no 69, 43 Fitzroy Street, Golden Point, Victoria, AUS
                    </p>
                </div>

                <div className='flex flex-col gap-2.5'>
                    <h5>
                        Contact
                    </h5>
                    <p className='text-neutral-contrast'>
                        03377308264 - umer.mushtaq@outlook.com
                    </p>
                </div>

            </main>

        </section>
    );
};

export default LawyerBookAppointment;