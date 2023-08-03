import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RxStarFilled } from 'react-icons/rx';
import axios from '../api/axios';
import moment from 'moment';

const LawyerDashboardData = ({ lawyerId, token }) => {


    const [rating, setRating] = useState(0);
    const [appointmentsToday, setAppointmentsToday] = useState(0);
    const [appointmentsMonth, setAppointmentsMonth] = useState(0);


    useEffect(() => {

        const fetchReview = async () => {
            try {
                const response = await axios.get(`/reviews`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });
                let ratingCount = 0;
                const newReviews = response.data.map((item) => {
                    ratingCount += item.rating;
                    return item;
                });

                setRating((ratingCount / newReviews.length));


            } catch (e) {
                console.log(e);
            }
        };

        const fetchAppointments = async () => {
            try {
                const { data } = await axios.get(`/appointments`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                let monthCount = 0;
                let todayCount = 0;
                data.forEach((item) => {

                    const givenMonth = 1 + moment(item.appointmentDate).month();
                    const currentMonth = 1 + moment().month();

                    if (givenMonth === currentMonth) {
                        monthCount++;
                        if (moment().isSame(moment(item.appointmentDate), 'today')) {
                            todayCount++;
                        }

                    }
                });

                setAppointmentsMonth(monthCount);
                setAppointmentsToday(todayCount);

            } catch (error) {
                console.log(error);
            }
        };

        fetchAppointments();
        fetchReview();

    }, [token]);


    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = new Date();
    let monthNow = month[d.getMonth()];


    return (
        <div className='flex flex-col justify-center'>
            <div className='border-y border-neutral-contrast border-opacity-25 p-5 flex justify-between items-center w-full'>
                <p className='text-xl'>Rating</p>

                <span className='flex items-center my-1'>

                    <h6 className='font-semibold px-1 text-secondary-b'>
                        {rating.toFixed(1)}
                    </h6>
                    {(() => {
                        let row = [];
                        for (let i = 0; i < rating; i++) {
                            if (rating > i + 0.5) {
                                row.push(<RxStarFilled key={i} className='h-5 w-5 ' color={'#FF9529'} />);
                            } else {
                                <></>;
                            }
                        }
                        return row;

                    })()}
                </span>
            </div>

            <div className='border-y border-neutral-contrast border-opacity-25 p-5 flex justify-between items-center w-full'>
                <p className='text-xl'>Appointments Today</p>
                <div className='flex'>
                    {appointmentsToday}
                </div>
            </div>

            <div className='border-y border-neutral-contrast border-opacity-25 p-5 flex justify-between items-center w-full'>
                <p className='text-xl'>Appointments in {monthNow}</p>
                <div className='flex'>
                    {appointmentsMonth}
                </div>
            </div>


            <div className='border-y border-neutral-contrast border-opacity-25 p-5 flex justify-between items-center w-full'>
                <p className='text-xl'>Available</p>
                <Link to={'/availability'} className="secondary-btn text-sm font-medium">
                    Set Availability
                </Link>
            </div>
        </div>
    );
};

export default LawyerDashboardData;