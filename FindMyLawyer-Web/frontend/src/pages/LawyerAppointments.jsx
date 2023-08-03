import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import AppointmentCard from '../components/AppointmentCard';
import moment from 'moment';

const LawyerAppointments = () => {

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


    const getDifferenceInDate = (appointmentDate) => {

        const today = moment.utc();
        const givenDate = moment(appointmentDate);

        return givenDate.diff(today, "days");
    };


    return (

        <main className='bg-neutral'>
            <section className='table-section'>
                <button onClick={displayAppointmentsForToday} className="primary-btn w-max my-5">
                    Show {showToday ? 'All Appointments' : 'Appointments For Today'}
                </button>
                <nav className='table-heading'>
                    <h5 className='w-1/5 '>Client</h5>
                    <h5 className='w-1/5 '>Contact</h5>
                    <h5 className='w-1/5 '>Date</h5>
                    <h5 className='w-1/5 '>Timing</h5>
                    <h5 className='w-1/5 '>Status</h5>
                    <h5 className='w-1/5 '>Info</h5>
                </nav>
                <main>
                    {
                        appointments.map((appointment) => {
                            return (
                                <AppointmentCard
                                    daysDifference={getDifferenceInDate(appointment.appointmentDate)}
                                    key={appointment._id} appointmentId={appointment._id}
                                    clientName={appointment.clientName} contact={appointment.phoneNumber}
                                    description={appointment.appointmentBrief}
                                    date={appointment.appointmentDate} timing={appointment.appointmentTiming} status={appointment.status}
                                />

                            );
                        })
                    }

                </main>
            </section>
        </main>
    );
};

export default LawyerAppointments;