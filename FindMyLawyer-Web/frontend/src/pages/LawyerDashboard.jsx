import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthProvider';
import axios from '../api/axios';
import lawyer from '../assets/imgs/dummy-lawyer.jpg';
import TagsInput from '../components/TagsInput';
import LawyerDashboardData from '../components/LawyerDashboardData';

const LawyerDashboard = () => {

    const [profilePicture, setProfilePicture] = useState('');

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        city: '',
        license: '',
        keywords: [],
        description: '',
        profilePicture: '',
        phone: '',
        address: ''
    });
    const [description, setDescription] = useState(data.description);
    const [phone, setPhone] = useState(data.phone);
    const [address, setAddress] = useState(data.address);
    const [categoryTags, setCategoriesTags] = useState(data.keywords);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/lawyers/${auth._id}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${auth.token}`
                        }
                    });
                setData(response.data);
                setDescription(response.data.description);
                setCategoriesTags(response.data.keywords);
                setAddress(response.data.address);
                setPhone(response.data.phone);
                setProfilePicture(response.data.profilePicture);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();

    }, [auth.token, auth._id]);

    const handleDescriptionChange = async (e) => {
        setDescription(e.target.value);
    };
    const handlePhoneChange = (e) => {
        setPhone(e.target.value.replace(/[^0-9]/g, '').toLowerCase());
    };
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleDescriptionUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/lawyers/${auth._id}`, { description });
        } catch (error) {
            console.log(error);
        }
    };
    const handlePhoneUpdate = async (e) => {
        e.preventDefault();
        try {
            if (phone.length === 11) {
                await axios.put(`/lawyers/${auth._id}`, { phone });
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleAddressUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/lawyers/${auth._id}`, { address });
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeywordsUpdate = async (e) => {
        e.preventDefault();
    };

    const handleProfileChange = async (e) => {
        const file = e.target.files[0];

        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "FindMyLawyer");
        data.append("cloud_name", "du43gxrf2");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/du43gxrf2/image/upload", {
            method: "post",
            body: data
        });

        const url = await res.json();

        try {
            await axios.put(`/lawyers/${auth._id}`, { profilePicture: url.secure_url }, {
                headers: {
                    "Authorization": `Bearer ${auth.token}`
                }
            },);
            setProfilePicture(url.secure_url);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <main className='bg-primary bg-opacity-10'>
            <section className='r-h flex w-full sm:flex-row flex-col py-10 container'>
                <section className='w-full sm:w-1/4 my-5 sm:my-0 sm:mr-5 card-board pb-5 '>

                    <div className='flex flex-col items-center justify-center w-full h-2/5 p-5'>
                        <label className='h-full' htmlFor="profile-picture">
                            <img className='rounded-full w-36 h-36 align-middle object-cover' src={profilePicture || lawyer} alt="lawyer" />
                        </label>
                        <input
                            className='h-0'
                            label="Image" accept='.jpeg, .png, .jpg' id='profile-picture' type="file"
                            onChange={(e) => handleProfileChange(e)}
                        />
                        <h2 className='text-center pb-5 capitalize'>{data.name}</h2>
                    </div>

                    <LawyerDashboardData lawyerId={data._id} token={auth.token} />

                </section>

                <section className='w-full sm:w-3/4 my-5 sm:my-0 sm:ml-5 p-10 card-board'>
                    <form className='h-3/4 flex flex-col flex-grow' onSubmit={handleDescriptionUpdate}>
                        <div className='flex w-full justify-between items-center'>
                            <label className='text-xl font-medium'>Description</label>
                            <button
                                type='submit'
                                className="tertiary-btn">
                                update description
                            </button>
                        </div>
                        <textarea onChange={handleDescriptionChange} value={description} placeholder='Describe yourself as an lawyer so that clients can understand you better. (max 300 char)' className='bg-neutral-contrast bg-opacity-10 w-full p-5 standard-input h-full' name="" id="" rows="10"></textarea>
                    </form>
                    <form className='pt-5 h-1/4 flex flex-col flex-grow' onSubmit={handleKeywordsUpdate}>
                        <div className='flex w-full justify-between items-center'>
                            <label className='text-xl font-medium'>Description</label>
                            <button button
                                type='submit'
                                className="tertiary-btn">
                                update keywords
                            </button>
                        </div>
                        <TagsInput placeholder='Write keywords so clients can find you by your expertise.' className={'w-full border-primary-600 border h-full'} setCategoriesTags={setCategoriesTags} categoryTags={categoryTags} />
                    </form>
                    <form className='h-3/4 flex flex-col flex-grow' onSubmit={handlePhoneUpdate}>
                        <div className='flex w-full justify-between items-center'>
                            <label className='text-xl font-medium'>phone</label>
                            <button
                                type='submit'
                                className="tertiary-btn">
                                update phone
                            </button>
                        </div>
                        <input type='tel' onChange={handlePhoneChange} value={phone} placeholder='Phone (0300-1234567)' className='bg-neutral-contrast bg-opacity-10 w-full standard-input h-full' />
                    </form>
                    <form className='h-3/4 flex flex-col flex-grow' onSubmit={handleAddressUpdate}>
                        <div className='flex w-full justify-between items-center'>
                            <label className='text-xl font-medium'>address</label>
                            <button
                                type='submit'
                                className="tertiary-btn">
                                update address
                            </button>
                        </div>
                        <input minLength={11} maxLength={11} type='tel' onChange={handleAddressChange} value={address} placeholder='abc building, xyz street, Karachi' className='bg-neutral-contrast bg-opacity-10 w-full standard-input h-full' />
                    </form>
                </section>
            </section>
        </main>
    );
};

export default LawyerDashboard;