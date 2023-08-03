import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ icon, children }) => {

    const navigate = useNavigate();

    const navigateToCategory = () => {
        navigate(`/lawyers/search/${children}`);
    };

    return (
        <div onClick={navigateToCategory} className='w-20 mx-5 group '>
            <div className='bg-primary w-max h-max p-3 flex justify-center items-center rounded-full my-1 group-hover:scale-105 cursor-pointer transition-all'>
                <img className='w-16 h-16 p-1 rounded-full' src={icon} alt={children} />
            </div>
            <h6 className='text-center my-1 group-hover:cursor-pointer group-hover:text-secondary-b transition-all'>{children}</h6>
        </div>
    );
};

export default CategoryCard;