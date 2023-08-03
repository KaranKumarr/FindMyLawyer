import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import TagsInput from '../components/TagsInput';
import plus from '../assets/imgs/plus_file.svg';



const REGISTER_URL = '/lawyers/';
const LawyerSignUp = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [citySelected, setCitySelected] = useState(null);
    const [categoryTags, setCategoriesTags] = useState([]);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [license, setLicense] = useState(null);
    const [licenseUrl, setLicenseUrl] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    console.log(license);


    const handleRegistration = async (event) => {
        event.preventDefault();

        try {
            if (license) {
                const data = new FormData();
                data.append("file", license);
                data.append("upload_preset", "FindMyLawyer");
                data.append("cloud_name", "du43gxrf2");

                const res = await fetch(
                    "https://api.cloudinary.com/v1_1/du43gxrf2/image/upload", {
                    method: "post",
                    body: data
                });

                const url = await res.json();
                setLicenseUrl(url.secure_url);
            } else {
                setErrorMessage('No File Attached');
                return;
            }

            const response = await axios.post(REGISTER_URL,
                JSON.stringify(
                    {
                        name,
                        email: email.toLowerCase(),
                        password,
                        city: citySelected,
                        keywords: categoryTags,
                        license: licenseUrl,
                        address,
                        phone
                    }
                ),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if (response.status === 201) {
                console.log(response);
                navigate('/login');
            } else {
                setErrorMessage("something went wrong");
                console.log(response);
            }
        } catch (e) {
            setErrorMessage(e.response.data.message);
        }
    };

    return (
        <main className='bg-neutral-contrast r-h w-full flex'>
            <section className='lg:w-1/4'></section>
            <section
                className='bg-neutral rounded-l-lg w-full lg:w-3/4 text-center py-8 flex flex-col flex-grow items-center justify-center'>
                <h1 className=' w-4/5 sm:w-2/3'>Setup Your Account</h1>
                <h6 className=' w-4/5 sm:w-2/3 opacity-75 capitalize mb-3'>Register yourself as a lawyer looking for
                    clients</h6>
                <form onKeyPress={(e) => {
                    e.key === 'Enter' && e.preventDefault();
                }} onSubmit={handleRegistration} className=' w-4/5 sm:w-2/3 flex flex-col  items-center my-3'>
                    <input required value={name} onChange={e => {
                        setName(e.target.value);
                    }}
                        minLength={3} type="text" className={`w-4/5 sm:w-2/3 standard-input my-3`}
                        placeholder='Name (as written in NIC)'
                    />
                    <div className='flex justify-between gap-3 w-4/5 sm:w-2/3 '>
                        <input required value={email} onChange={e => {
                            setEmail(e.target.value);
                        }} type="email" className='standard-input my-3 w-full' placeholder='Email' />
                        <input required value={phone} onChange={e => {
                            setPhone(e.target.value);
                        }} minLength={11} maxLength={11} type="tel" className='standard-input my-3 w-full'
                            placeholder='Phone(0301-2345678)' />
                    </div>
                    <div className='flex justify-between gap-3 w-4/5 sm:w-2/3 '>
                        <input required value={password} onChange={e => {
                            setPassword(e.target.value);
                        }} minLength={6} type="password" className='standard-input my-3 w-full'
                            placeholder='Password' />
                        <input required value={confirmPassword} onChange={e => {
                            setConfirmPassword(e.target.value);
                        }} minLength={6} type="password" className='standard-input my-3 w-full'
                            placeholder='Confirm Password' />
                    </div>

                    <input required value={address} onChange={e => {
                        setAddress(e.target.value);
                    }} minLength={6} type="text" className='w-4/5 sm:w-2/3 standard-input my-3'
                        placeholder='Address' />

                    <div className='w-4/5 sm:w-2/3 flex'>
                        <select required className='w-full standard-input my-3 mr-3' value={citySelected}
                            onChange={e => setCitySelected(e.target.value)}>
                            <option selected disabled>City</option>
                            <option value="Karachi">Karachi</option>
                            <option value="Lahore">Lahore</option>
                        </select>
                        <div
                            className=' relative flex standard-input border-dashed border-opacity-50  border-neutral-contrast border cursor-pointer'>
                            <input
                                onChange={(e) => { setLicense(e.target.files[0]); }}
                                type="file" className='opacity-0 w-full flex-grow relative z-10 cursor-pointer'
                                placeholder='Confirm Password' />
                            <div
                                className=' w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center cursor-pointer'>
                                <img className='h-5' src={plus} alt="plus_icon" />
                                <p className='opacity-50 text-xs'>Add lawyer lisence</p>
                            </div>
                        </div>
                    </div>

                    <TagsInput className='border border-primary-600 w-4/5 sm:w-2/3' categoryTags={categoryTags}
                        setCategoriesTags={setCategoriesTags} />

                    <button type='submit' className='w-4/5 sm:w-2/3 primary-btn mt-3'>Sign Up</button>

                    <p className='text-exception my-1 font-semibold'>{errorMessage}.</p>
                </form>
            </section>
        </main>
    );
};

export default LawyerSignUp;