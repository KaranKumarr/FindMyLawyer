import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import UnverifiedLawyerCard from '../components/UnverifiedLawyerCard';


const LAWYERS_URL = '/lawyers';
const AdminDashboard = () => {

    const [lawyers, setLawyers] = useState([]);

    const removeLawyerFromList = (lawyerId) => {

        const filteredLawyers = lawyers.filter((lawyer) => {
            if (lawyer.id !== lawyerId) {
                return lawyer;
            }
        });
        setLawyers(filteredLawyers);
    };

    useEffect(() => {

        const fetchLawyers = async () => {
            try {
                const response = await axios.get(LAWYERS_URL);
                setLawyers(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchLawyers();
    }, []);


    return (
        <main className='container my-10'>

            <div className='bg-secondary-a/20 flex justify-between border-b-2 border-secondary-a'>
                <h6 className='w-1/5 text-center p-5 border-r-2 border-secondary-a'>
                    Name
                </h6>
                <h6 className='w-1/5 text-center p-5 border-r-2 border-secondary-a'>
                    City
                </h6>
                <h6 className='w-1/5 text-center p-5 border-r-2 border-secondary-a'>
                    Created On
                </h6>
                <h6 className='w-1/5 text-center p-5 border-r-2 border-secondary-a'>
                    License
                </h6>
                <h6 className='w-1/5 text-center p-5 '>
                    Action
                </h6>
            </div>

            {lawyers.map((lawyer) => {
                if (lawyer.isVerified === true) {
                    return '';
                } else {
                    return <UnverifiedLawyerCard removeLawyerFromList={removeLawyerFromList} lawyer={lawyer} />;
                }
            })}
        </main>
    );
};

export default AdminDashboard;