import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import logo from '../assets/imgs/logo_white.svg';
import { CgMenu, CgClose } from 'react-icons/cg';

const Navbar = () => {



    const { auth } = useContext(AuthContext);

    const protectedAdminLinks = [
        {
            name: 'Home',
            link: '/admin'
        },
        {
            name: 'Log Out',
            link: '/logout'
        },

    ];

    const protectedLawyerLinks = [
        {
            name: 'Dashboard',
            link: '/dashboard'
        },
        {
            name: 'Reviews',
            link: '/reviews'
        },
        {
            name: 'Appointments',
            link: '/appointments'
        },
        {
            name: 'Log Out',
            link: '/logout'
        },

    ];

    const protectedClientLinks = [
        {
            name: 'Appointments',
            link: '/history'
        },
        {
            name: 'Find Lawyers',
            link: '/lawyers'
        },
        {
            name: 'Log Out',
            link: '/logout'
        },

    ];

    // State management of navbar menu on mobile
    const [isMenuOpen, setMenuOpen] = useState(false);
    const changeMenuState = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <header className='bg-primary '>
            <nav className='container text-neutral py-4 flex justify-between items-center lg:h-[12.5vh]'>
                <div className='flex items-center'>
                    <img className='h-16 px-2' src={logo} alt="logo" />
                    <Link to={'/'}>
                        <h3 className='font-logo tracking-wider uppercase px-2 hidden md:block'>
                            Find My Lawyer
                        </h3>
                    </Link>
                </div>
                <button onClick={changeMenuState}>
                    <CgMenu className='h-16 w-16  px-2 sm:hidden' />
                </button>

                {/* transparent background on side of vertival menu in mobile view*/}
                {isMenuOpen ?
                    <div onClick={changeMenuState} className='fixed h-screen w-1/5 top-0 left-0 bg-primary-700 transition-all opacity-25 sm:hidden'></div>
                    : ''
                }
                <div className={`fixed top-0 ${isMenuOpen ? 'right-0' : '-right-full'} h-screen w-4/5 bg-primary-700 sm:bg-transparent transition-all flex flex-col sm:block sm:static sm:w-auto sm:h-auto z-50`}>
                    {auth?.userType === 'lawyer' ?
                        protectedLawyerLinks.map((item, i) => {
                            return (
                                <Link key={i} to={item.link} className='nav-link'>{item.name}</Link>
                            );
                        })
                        : (auth?.userType === 'client' ?
                            <>
                                {protectedClientLinks.map((item, i) => {
                                    return (
                                        <Link key={i} to={item.link} className='nav-link'>{item.name}</Link>
                                    );
                                })}
                            </>
                            : (auth?.userType === 'admin' ? <>
                                {protectedAdminLinks.map((item, i) => {
                                    return (
                                        <Link key={i} to={item.link} className='nav-link'>{item.name}</Link>
                                    );
                                })}
                            </> : (
                                <>
                                    <Link to="/" className='nav-link'>Home</Link>
                                    <Link to="/signup-lawyer" className='nav-link'>Find Cases</Link>
                                    <Link to="/signup-client" className='nav-link'>Find lawyers</Link>
                                    <Link to="/login" className='nav-link'>Login</Link>
                                </>
                            )))
                    }

                    <button onClick={changeMenuState} className='w-full flex justify-center'>
                        <CgClose className='h-16 w-16  px-2 sm:hidden' />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;