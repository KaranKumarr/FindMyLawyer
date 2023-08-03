import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxStarFilled, RxStar } from 'react-icons/rx';
import CurrentLawyerContext from '../context/CurrentLawyerProvider';

const LawyerCard = ({ lawyer }) => {

    const { setCurrentLawyer } = useContext(CurrentLawyerContext);

    const navigate = useNavigate();

    const [profileImage, setProfileImage] = useState(lawyer.profilePicture);

    useEffect(() => {
        const generateProfilePic = async () => {
            const { url } = await fetch(`https://ui-avatars.com/api/?name=${lawyer.name}&background=9FC131&color=FFFFF0&size=256`);
            setProfileImage(url);
        };

        if (!profileImage)
            generateProfilePic();

    }, [lawyer.name, profileImage]);

    const description = lawyer.description ? lawyer.description : "Lorem ipsum dolor sit amet consectetur, adipisicing elit.Itaque labore accusantium odit expedita omnis voluptate laboriosam error aperiam dolores, autem sit aliquid laborum qui, eum sed facere ? Reiciendis, quas facilis.";


    const maxDescLength = 130;
    const shortLawyerDesc = description.length > maxDescLength ? description.slice(0, maxDescLength - 1) + "..." : description;

    const navigateToLawyerProfile = () => {

        localStorage.setItem("currentLawyer", JSON.stringify(lawyer));
        setCurrentLawyer(JSON.parse(localStorage.getItem("currentLawyer")));

        navigate(`/lawyer/${lawyer._id}`);
    };


    return (
        <div className='w-full sm:w-2/4 lg:w-1/3 sm:pr-5 pb-5'>
            <div className='flex bg-primary bg-opacity-10 p-2.5 rounded-lg border border-neutral-contrast border-opacity-10'>
                <img
                    className='w-32 h-32 min-h-[8rem] min-w-[8rem] aspect-square object-cover p-2.5 rounded-xl' src={profileImage} alt="Lawyer" />
                <div className='py-2.5'>
                    <h4 className='mb-2.5 border-b-2 border-secondary-b pb-0.5  leading-none capitalize'>{lawyer.name}</h4>
                    <p className='mb-2.5 border-b-2 border-secondary-b pb-0.5 '>
                        {shortLawyerDesc}
                    </p>
                    <div className='flex mb-2.5 border-b-2 border-secondary-b pb-0.5  items-center space-x-0.5'>
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

                        })()}<span className='text-secondary-b'>({lawyer.count})</span>
                    </div>
                    <button onClick={navigateToLawyerProfile} className="primary-btn text-base">
                        Book Appointment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LawyerCard;