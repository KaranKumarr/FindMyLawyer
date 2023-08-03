import React, { useState, useEffect } from 'react';
import moment from 'moment/moment';
import { RxStarFilled, RxStar } from 'react-icons/rx';
import axios from '../api/axios';

const ReviewCard = ({ profilePic, review, rating, dated, name, clientId }) => {

    const date = moment((moment(dated).format("mm HH DDMMYYYY")), "mm HH DDMMYYYY").fromNow();
    const [clientName, setClientName] = useState(name);

    const [profileImage, setProfileImage] = useState(profilePic);

    useEffect(() => {

        if (!clientName) {
            const fetchClientName = async () => {
                try {
                    const { data } = await axios.get(`clients/${clientId}`);
                    setClientName(data.name);
                } catch (error) {
                    setClientName('Anonymous');
                }
            };
            fetchClientName();
        }

        const generateProfilePic = async () => {
            try {
                const { url } = await fetch(`https://ui-avatars.com/api/?name=${clientName}&background=9230C2&color=FFFFF0&size=256`);
                setProfileImage(url);
            } catch (error) {
                console.log(error);
            }
        };

        if (!profileImage)
            generateProfilePic();

    }, [profileImage, clientId, clientName]);



    return (
        <div className='border-b border-neutral-contrast border-opacity-50 pb-5 mb-5'>
            <header className='flex '>
                <img className='w-24 h-24 rounded-full object-cover' src={profileImage} alt="profile" />
                <div className='p-2 flex flex-col  justify-center'>
                    <h5>{clientName}</h5>
                    <div className='flex'>
                        <span className='flex pr-2 border-opacity-50  border-r border-neutral-contrast my-1'>
                            {(() => {
                                let row = [];
                                for (let i = 0; i < rating; i++) {
                                    if (rating > i + 0.5) {
                                        row.push(<RxStarFilled key={i} className='h-5 w-5 ' color={'#FF9529'} />);
                                    } else {
                                        row.push(<RxStar key={i} className='h-5 w-5 ' color={'#FF9529'} />);
                                    }
                                }
                                return row;

                            })()}
                        </span>
                        <span className='flex pl-2 border-opacity-50  border-l border-neutral-contrast my-1'>{date}</span>
                    </div>
                </div>
            </header>
            <main className='sm:ml-24 sm:mt-0 mt-5 p-3 rounded-md bg-primary bg-opacity-10 text-lg font-light text-neutral-contrast'>
                {review}
            </main>
        </div>
    );
};

export default ReviewCard;