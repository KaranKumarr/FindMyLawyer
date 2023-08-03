import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useState, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';


const SIGNUP_URL = '/clients';
const ClientSignUp = () => {

    const { setAuth } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(SIGNUP_URL,
                JSON.stringify({ email: email.toLowerCase(), password, name: name.toLowerCase() }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(data);
            localStorage.setItem("auth", JSON.stringify(data));
            setAuth(JSON.parse(localStorage.getItem("auth")));
            if (data.token && data.userType === 'client') {
                navigate('/lawyers');
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error.response.data.message);
        }
    };


    return (

        <main className='flex flex-row-reverse bg-neutral text-neutral-contrast flex-grow r-h'>

            <section className='w-full lg:w-2/4 flex flex-col items-center justify-center flex-grow my-32 lg:my-20 py-3 '>
                <h1>Welcome To Find My Lawyer</h1>
                <h6 className='opacity-75'>Sign up and get started</h6>
                <form onSubmit={handleSignIn} className='flex flex-col my-8 lg:my-4'>

                    <label className='label' htmlFor="name">Your Name</label>

                    <input required value={name} onChange={e => {
                        setName(e.target.value);
                    }} className='standard-input' type="name" placeholder='Enter your name' />

                    <label className='label mt-6' htmlFor="email">Your Email</label>
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
                        <h5 className='my-4'>Already have an account?
                            <Link to={'/login'} className='text-secondary-b mx-1 transition-all hover:underline'>Sign In</Link>
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

export default ClientSignUp;