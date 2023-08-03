import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assets/animations/page-not-found.json';

const PageNotFound = () => {
    return (
        <main className='flex flex-col w-full h-full justify-center my-28'>
            <Lottie className='h-96 ' animationData={animationData} />

            <div className='flex items-center justify-center w-full'>
                <h5>
                    Do you want to redirect to
                </h5>
                <Link to={'/'} className="tertiary-btn px-1 p-0">
                    Home?
                </Link>
            </div>
        </main>
    );
};

export default PageNotFound;