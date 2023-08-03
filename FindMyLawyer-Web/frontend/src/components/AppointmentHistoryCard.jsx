import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import axios from '../api/axios';



const getTimeInAmPm = (timing) => {

    let hour = parseInt(timing.split(":")[0]) % 12;
    let timeInAmPm = (hour === 0 ? "12" : hour) + ":" + timing.split(":")[1] + " " + (parseInt(parseInt(timing.split(":")[0]) / 12) < 1 ? "am" : "pm");

    return timeInAmPm;
};

const LAWYER_URL = '/lawyers/';
const AppointmentHistoryCard = ({ appointment, token }) => {

    const navigate = useNavigate();
    const [lawyer, setLawyer] = useState({});

    useEffect(() => {

        const fetchLawyer = async () => {

            try {
                const { data } = await axios.get(LAWYER_URL + appointment.lawyer, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setLawyer(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }

        };

        fetchLawyer();
    }, [appointment.lawyer, token]);

    const viewDetail = () => {
        navigate(`/history/${appointment._id}`, { state: { lawyer, appointment } });
    };

    const cancelAppointment = async () => {

        const res = await axios.delete('appointments/' + appointment._id, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (res.status === 200) {
            navigate('/');
        }
    };

    return (
        <div className='appointment-history'>

            <img src={lawyer.profilePicture} alt={lawyer.profilePicture} />
            <div className='flex-grow flex flex-col gap-2.5'>
                <h5>
                    {lawyer.name}
                </h5>
                <p> {getTimeInAmPm(appointment.appointmentTiming)} | {moment(appointment.appointmentDate).format('dddd, DD MMM YY')} | {lawyer.address} | {lawyer.phone} </p>
            </div>
            {
                appointment.status ?
                    (
                        <button onClick={viewDetail}>
                            View Detail
                        </button>)
                    : (
                        <button onClick={cancelAppointment}>
                            Cancel Appointment
                        </button>
                    )
            }

        </div>
    );
};

export default AppointmentHistoryCard;