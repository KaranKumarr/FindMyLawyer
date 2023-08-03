import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxStarFilled, RxStar } from 'react-icons/rx';


const LawyerProfileHeader = ({ lawyer }) => {


    const [profileImage, setProfileImage] = useState(lawyer.profilePicture);

    useEffect(() => {
        const generateProfilePic = async () => {
            const { url } = await fetch(`https://ui-avatars.com/api/?name=${lawyer.name}&background=9FC131&color=FFFFF0&size=256`);
            setProfileImage(url);
        };

        if (!profileImage)
            generateProfilePic();

    }, [lawyer.name, profileImage]);

    const navigate = useNavigate();

    return (
        <header className='flex  justify-between items-center bg-primary bg-opacity-20 rounded-lg p-10'>
            <section className='flex items-center gap-5'>

                <img className='h-40 w-40 rounded-lg object-cover' src={profileImage} alt="Lawyer" />

                <div className='flex flex-col gap-2'>

                    <h2 className='text-neutral-contrast'>
                        {lawyer.name}
                    </h2>
                    <div className='flex items-center space-x-0.5'>
                        {(() => {
                            let row = [];
                            for (let i = 0; i < 5; i++) {
                                if (lawyer.rating > i + 0.5) {
                                    row.push(<RxStarFilled key={i} className='h-5 w-5 ' color={'#FF9529'} />);
                                } else {
                                    row.push(<RxStar key={i} className='h-5 w-5 ' color={'#FF9529'} />);
                                }
                            }
                            return row;

                        })()}<span className='text-secondary-b'></span>
                    </div>

                    <h6 className='text-primary-600 font-normal'>
                        <span className='font-semibold'>
                            {lawyer.count}
                        </span> Reviews
                    </h6>

                    <h6 className='text-primary-600 font-normal'>
                        {/* <span className='font-semibold'>
                            69%
                        </span> Satisfaction */}
                    </h6>

                </div>

            </section>
            <section className='flex flex-col gap-5'>
                <button
                    onClick={() => {
                        navigate(`/lawyer/${lawyer._id}/book`);
                    }}
                    className="primary-btn">
                    Book Appointment
                </button>
                <button
                    onClick={() => {
                        navigate(`/lawyer/${lawyer._id}/reviews`);
                    }}
                    className="secondary-btn">
                    View Reviews
                </button>
            </section>
        </header>
    );
};

export default LawyerProfileHeader;