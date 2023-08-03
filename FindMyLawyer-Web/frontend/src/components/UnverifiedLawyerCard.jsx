import React, { useContext } from 'react';
import fileDownload from '../assets/imgs/file_download.svg';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';


const LAWYER_URL = '/lawyers/';
const UnverifiedLawyerCard = ({ lawyer, removeLawyerFromList }) => {


    const { auth } = useContext(AuthContext);

    const rejectLawyerApplication = async () => {

        try {

            await axios.delete(LAWYER_URL + lawyer._id,
                {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    }
                });

            window.location.reload();

        } catch (error) {
            console.log(error);
        }

    };

    const approveLawyerApplication = async () => {
        try {

            await axios.put(LAWYER_URL + lawyer._id,
                {
                    isVerified: true
                },
                {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    }
                });

            window.location.reload();

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className='bg-secondary-a/10 flex justify-between items-center border-b-2 border-secondary-a/50'>
            <h6 className='w-1/5 text-center p-5  border-r-2 border-secondary-a/50'>
                {lawyer.name}
            </h6>
            <h6 className='w-1/5 text-center p-5  border-r-2 border-secondary-a/50'>
                {lawyer.city}
            </h6>
            <h6 className='w-1/5 text-center p-5  border-r-2 border-secondary-a/50'>
                {lawyer.createdAt}
            </h6>
            <h6 className='w-1/5 text-center p-5  border-r-2 border-secondary-a/50'>
                <a target='_blank' rel="noreferrer" className='flex justify-center' href={lawyer.license}>
                    <img className='h-7' src={fileDownload} alt='' />
                </a>
            </h6>
            <div className='w-1/5  text-center p-5 space-x-2.5'>
                <button onClick={approveLawyerApplication}
                    className='secondary-btn text-base py-1 border-primary text-primary'>
                    Verify
                </button>

                <button onClick={rejectLawyerApplication}
                    className='secondary-btn text-base py-1 border-exception text-exception'>
                    Reject
                </button>
            </div>
        </div>);
};

export default UnverifiedLawyerCard;