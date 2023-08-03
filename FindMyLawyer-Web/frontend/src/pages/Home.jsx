import React from 'react';
import { Link } from 'react-router-dom';
import mockMobile from '../assets/imgs/mock_mobile.svg';
import aboutUs from '../assets/imgs/about_us.png';

function Home() {
    return (
        <main className='bg-neutral'>
            <main className='py-10 3xl:py-16 flex justify-between flex-col md:flex-row  text-neutral-contrast r-h container'>
                <section className='w-full md:w-2/4 md:block flex flex-col items-center'>
                    <h1 className='w-4/5 md:w-4/6 3xl:w-3/5'>
                        Need <span className='bg-secondary-a text-neutral py-0.5 px-2 rounded-lg'>Lawyers</span> that best suits your legal issues?
                    </h1>
                    <h5 className='text-2xl my-8 md:my-12 w-4/5 md:w-full'>
                        Our primary goal is to create a platform where people can find best possible lawyers for their legal problems
                    </h5>
                    <div className='flex flex-col justify-center'>
                        <Link to={'/signup-lawyer'} className='primary-btn md:w-1/4 xl:w-2/5 w-full text-center'>Find Lawyers</Link>
                        <h3 className=' md:w-1/4 xl:w-2/5 w-full text-center my-6'>OR</h3>
                        <Link to={'/signup-client'} className='primary-btn md:w-1/4 xl:w-2/5 w-full text-center'>Find Clients</Link>
                    </div>
                </section>
                <section className='hidden w-full md:w-2/4 md:flex justify-center relative'>

                    <img className='xl:w-1/3 md:w-2/4 w-2/5 z-10' src={mockMobile} alt="mock_mobile" />
                    <div className='absolute xl:w-1/3 md:w-2/4 h-full'>
                        <div className='circle top-2/4 -left-1/4'>
                        </div>
                        <div className='circle bottom-0 -right-0'>
                        </div>
                    </div>
                </section>
            </main>
            <section className='md:pt-24 container flex flex-col-reverse sm:flex-row justify-between items-center  text-neutral-contrast h-screen'>
                <section className='mx-4 my-4 sm:my-0 w-4/5 sm:w-full md:w-2/4'>
                    <img className='w-full md:w-3/4' src={aboutUs} alt="about_us" />
                </section>
                <section className='mx-4 w-full md:w-2/4'>
                    <h1 className='my-8'>
                        About us
                    </h1>
                    <div className=' md:w-3/4'>
                        <h5 className='my-4 md:my-8'>
                            Find My Lawyer is an online software that works as a connecting bridge between lawyers and clients
                        </h5>
                        <h5 className='my-4 md:my-8'>
                            The main purpose of his project is to enable the general people to hire a lawyer through a mobile application and website.
                        </h5>
                        <h5 className='my-4 md:my-8'>
                            This allows users in need of lawyers to find lawyers based on their requirements and allows them to book appointments with lawyers.
                        </h5>
                    </div>
                </section>
            </section>
        </main>
    );
}

export default Home;