import moment from 'moment';
import React from 'react';
import { useLocation } from 'react-router-dom';


const getTimeInAmPm = (timing) => {

    let hour = parseInt(timing.split(":")[0]) % 12;
    let timeInAmPm = (hour === 0 ? "12" : hour) + ":" + timing.split(":")[1] + " " + (parseInt(parseInt(timing.split(":")[0]) / 12) < 1 ? "am" : "pm");

    return timeInAmPm;
};

const AppointmentDetails = () => {

    const location = useLocation();
    const lawyer = (location?.state.lawyer);
    const appointment = location?.state.appointment;

    return (

        <section className='container flex flex-col gap-10 py-10'>

            <main className='p-5 flex flex-col gap-5 bg-primary bg-opacity-20 rounded-lg text-neutral-contrast w-full'>

                <h4 className='font-semibold'>
                    Appointment Details
                </h4>
                <div className='flex flex-wrap'>

                    <span className='flex flex-col gap-1 w-1/3 pb-5 pr-5'>
                        <h5 className='font-semibold'>
                            Name
                        </h5>
                        <p className='font-medium'>
                            {appointment.clientName}
                        </p>
                    </span>

                    <span className='flex flex-col gap-1 w-1/3 pb-5 pr-5'>
                        <h5 className='font-semibold'>
                            Appointment Status
                        </h5>
                        <p className='font-medium'>
                            {appointment.status ? 'Completed' : 'Did not show up'}
                        </p>
                    </span>

                    <span className='flex flex-col gap-1 w-1/3 pb-5 pr-5'>
                        <h5 className='font-semibold'>
                            Timing
                        </h5>
                        <p className='font-medium'>
                            {getTimeInAmPm(appointment.appointmentTiming) + ' - ' + moment(appointment.appointmentDate).format('dddd, DD MMM YY')}
                        </p>
                    </span>

                    <span className='flex flex-col gap-1 w-1/3 pb-5 pr-5'>
                        <h5 className='font-semibold'>
                            Lawyer
                        </h5>
                        <p className='font-medium'>
                            {lawyer.name}
                        </p>
                    </span>

                    <span className='flex flex-col gap-1 w-1/3 pb-5 pr-5'>
                        <h5 className='font-semibold'>
                            Location
                        </h5>
                        <p className='font-medium'>
                            {lawyer.address}
                        </p>
                    </span>

                </div>


                <h4 className='font-semibold'>
                    Case/Meeting Summary
                </h4>
                <p className='font-medium'>
                    {appointment.summary}
                </p>

            </main>

        </section>
    );
};

export default AppointmentDetails;