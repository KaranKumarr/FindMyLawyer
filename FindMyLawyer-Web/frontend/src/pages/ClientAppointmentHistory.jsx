import React, { useContext, useEffect, useState } from 'react';
import AppointmentHistoryCard from '../components/AppointmentHistoryCard';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';
import moment from 'moment';

const APPOINTMENTS_URL = '/appointments';
const ClientAppointmentHistory = () => {

    const { auth } = useContext(AuthContext);
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {

        const fetchAppointments = async () => {
            try {

                const { data } = await axios.get(APPOINTMENTS_URL, {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    }
                });
                console.log(data);
                setAppointments(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchAppointments();

    }, [auth.token]);

    if (moment().isAfter(appointments[0]?.appointmentDate)) {
        console.log('hi');
    }


    const cancelAppointment = async (appointmentId) => {

        const res = await axios.delete('appointments/' + appointmentId, {
            headers: {
                "Authorization": `Bearer ${auth.token}`
            }
        });

        console.log(res);
        if (res?.status === 200) {
            const filteredAppointments = appointments.filter((item) => {
                if (res.data.appointmentId !== item._id) {
                    return item;
                }
            });
            setAppointments(filteredAppointments);
        }

    };

    return (
        <section className='container flex flex-col gap-10 py-10'>

            <main className='p-5 flex flex-col gap-5 bg-primary bg-opacity-20 rounded-lg text-neutral-contrast w-full'>

                <h4 className='text-neutral-contrast font-semibold'>
                    Upcoming Appointment(s)
                </h4>
                {appointments.map((appointment, i) => {

                    if (moment().isSameOrBefore(appointment.appointmentDate)) {
                        return (
                            <AppointmentHistoryCard key={i} appointment={appointment} token={auth.token} />
                        );
                    }
                })}

            </main>

            <main className='p-5 flex flex-col gap-5 bg-primary bg-opacity-20 rounded-lg text-neutral-contrast'>

                <h4 className='text-neutral-contrast font-semibold'>
                    Previous Appointments
                </h4>
                {appointments.map((appointment, i) => {

                    if (moment().isAfter(appointment.appointmentDate)) {
                        return (
                            <AppointmentHistoryCard cancelAppointment={cancelAppointment} token={auth.token} key={i} appointment={appointment} />
                        );
                    }
                })}

            </main>

        </section>
    );
};

export default ClientAppointmentHistory;