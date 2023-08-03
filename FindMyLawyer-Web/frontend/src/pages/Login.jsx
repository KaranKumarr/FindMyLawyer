import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';


const LAWYER_LOGIN_URL = '/lawyers/login';
const CLIENT_LOGIN_URL = '/clients/login';
const ADMIN_LOGIN_URL = '/admins/login';
const Login = () => {

    const { setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();

        if (email.includes('@fml.com')) {
            loginAsAdmin();
            return;
        }

        try {
            const { data } = await axios.post(LAWYER_LOGIN_URL,
                JSON.stringify({ email: email.toLowerCase(), password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            localStorage.setItem("auth", JSON.stringify(data));
            setAuth(JSON.parse(localStorage.getItem("auth")));
            if (data.token && data.userType === 'lawyer') {
                navigate('/dashboard');
            }
        } catch (error) {
            loginAsClient();
            console.log(error);
            setErrorMessage(error.response.data.message);
        }

        setEmail("");
        setPassword("");
    };

    const loginAsClient = async () => {

        const { data } = await axios.post(CLIENT_LOGIN_URL,
            JSON.stringify({ email: email.toLowerCase(), password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );

        localStorage.setItem("auth", JSON.stringify(data));
        setAuth(JSON.parse(localStorage.getItem("auth")));
        if (data.token && data.userType === 'client') {
            navigate('/lawyers');
        }
    };

    const loginAsAdmin = async () => {

        const adminId = email.split('@')[0];
        
        try {
            const { data } = await axios.post(ADMIN_LOGIN_URL, JSON.stringify({ adminId: adminId.toLowerCase(), password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            
            localStorage.setItem("auth", JSON.stringify(data));
            setAuth(JSON.parse(localStorage.getItem("auth")));
            if (data.token && data.userType === 'admin') {
                navigate('/admin');
            }

        } catch (error) {
            console.log(error);
        }

    };

    return (
        <main className='flex bg-neutral text-neutral-contrast flex-grow r-h'>
            <section className='w-full lg:w-2/4 flex flex-col items-center justify-center flex-grow my-32 lg:my-20 py-3 '>
                <h1>Welcome Back</h1>
                <h6 className='opacity-75'>Welcome back!  Please Enter Your details </h6>
                <form onSubmit={handleSignIn} className='flex flex-col my-8 lg:my-4'>
                    <label className='label' htmlFor="email">Your Email</label>
                    {/* #task_for_later: input validation */}
                    <input required value={email} onChange={e => {
                        setEmail(e.target.value);
                    }} className='standard-input' type="email" placeholder='Enter your email' />
                    <label className='label mt-6' htmlFor="password">Your Password</label>
                    <input required value={password} onChange={e => {
                        setPassword(e.target.value);
                    }} className='standard-input' type="password" placeholder='Enter your password' />
                    <div className='mt-8'>
                        <button type='submit' className='primary-btn w-full'>Sign In</button>
                        <h5 className='my-4'>Don’t have an account? Sign Up
                            <br />
                            <Link to={'/signup-lawyer'} className='text-secondary-b mx-1 transition-all hover:underline'>as Laywer?</Link>
                            OR
                            <Link to={'/signup-client'} className='text-secondary-b mx-1 transition-all hover:underline'>as Client?</Link>
                        </h5>
                    </div>
                    <p className='text-exception my-1 font-semibold'>{errorMessage}</p>
                </form>
            </section>

            <section className='hidden lg:flex flex-col flex-grow relative w-2/4 bg-neutral-contrast bg-opacity-5'>
                <div className='h-2/4'></div>
                <div className='bg-neutral-contrast bg-opacity-5 h-2/4 relative z-40'></div>
                <div className='z-10 h-52 w-52 rounded-full bg-primary shadow-2xl absolute top-2/4 -translate-y-2/4 right-2/4 translate-x-2/4'></div>
            </section>
        </main>
    );
};

export default Login;