import React from 'react';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
const AppointmentCard = ({ contact, date, timing, status, clientName, daysDifference, appointmentId }) => {


    const navigate = useNavigate();

    let hour = parseInt(timing.split(":")[0]) % 12;
    let timeInAmPm = (hour === 0 ? "12" : hour) + ":" + timing.split(":")[1] + " " + (parseInt(parseInt(timing.split(":")[0]) / 12) < 1 ? "am" : "pm");

    const goToAddInfoPage = () => {

        navigate('/appointments/summary/' + appointmentId);

    };

    return (
        <div className='table-card'>
            <p className='w-1/5'>
                {clientName}
            </p>
            <p className='w-1/5'>
                {contact}
            </p>
            <p className='w-1/5'>
                {moment(date).format("DD/MMM/YY")}
            </p>
            <p className='w-1/5'>
                {timeInAmPm}
            </p>
            <p className='w-1/5'>
                {status ? 'Complete' : 'Pending'}
            </p>
            <p className='w-1/5'>
                {/* {daysDifference > 0 ? 'Complete' : 'Pending'} */}
                <button onClick={goToAddInfoPage} disabled={daysDifference > 0 ? true : false} className='tertiary-btn py-0 disabled:text-opacity-50'>
                    Add Info
                </button>
            </p>
        </div>
    );
};

export default AppointmentCard;