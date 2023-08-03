import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import SearchBox from '../components/SearchBox';
import backgroundImage from '../assets/imgs/client_home.png';
import LawyerCard from '../components/LawyerCard';
import accidents from '../assets/imgs/accidents&injuries.svg';
import bankruptcy from '../assets/imgs/bankruptcy.svg';
import criminalDefense from '../assets/imgs/criminal_defense.svg';
import divorce from '../assets/imgs/divorce.svg';
import estatePlanning from '../assets/imgs/estate_planning.svg';
import familyLaw from '../assets/imgs/family_law.svg';
import wills from '../assets/imgs/wills.svg';
import immigration from '../assets/imgs/immigration.svg';
import propertySettlement from '../assets/imgs/property_settlement.svg';
import medicalMalpractice from '../assets/imgs/medical_malpractice.svg';
import axios from '../api/axios';
import AuthContext from '../context/AuthProvider';


const LAWYERS_URL = '/lawyers/top';
const ClientHome = () => {

    const [searchQuery, setSearchQuery] = useState("");
    const [lawyers, setLawyers] = useState([]);
    const { auth } = useContext(AuthContext);


    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const { data } = await axios.get(LAWYERS_URL,
                    {
                        headers: {
                            "Authorization": `Bearer ${auth.token}`
                        }
                    });

                setLawyers(data.lawyers);

            } catch (e) {
                console.log(e);
            }
        };

        fetchData();

    }, [auth.token]);


    const categoryList = [
        {
            icon: accidents,
            title: 'Accidents & Injuries'
        },
        {
            icon: bankruptcy,
            title: 'Bankruptcy'
        },
        {
            icon: criminalDefense,
            title: 'Criminal Defense'
        },
        {
            icon: divorce,
            title: 'Divorce'
        },
        {
            icon: estatePlanning,
            title: 'Estate Planning'
        },
        {
            icon: familyLaw,
            title: 'Family Law'
        },
        {
            icon: immigration,
            title: 'Immigration'
        },
        {
            icon: medicalMalpractice,
            title: 'Medical Malpractice'
        },
        {
            icon: propertySettlement,
            title: 'Property Settlement'
        },
        {
            icon: wills,
            title: 'Wills'
        }
    ];

    const handleSearching = (e) => {

        navigate(`/lawyers/search/${searchQuery}`);

        e.preventDefault();
    };

    return (
        <>
            <main className='r-h relative'>
                <img className='h-96 lg:h-auto r-h max-r-h sm:w-screen object-cover absolute z-10' src={backgroundImage} alt="backgroundImage" />
                <main className='h-96 lg:h-auto r-h max-r-h flex flex-col justify-center items-center bg-neutral-contrast text-white bg-opacity-60 relative z-20'>
                    <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearching={handleSearching} />
                </main>
            </main>
            <section className='bg-neutral r-h max-r-h pt-10 pb-10 lg:pb-40'>
                <header className='overflow-x-hidden container py-2.5'>
                    <h2>Top Rated Lawyers</h2>
                </header>
                <main className='container py-2.5 flex flex-wrap'>
                    {lawyers.map((lawyer, i) => {
                        if (i <= 5) {
                            return (

                                <LawyerCard lawyer={lawyer} key={i} />
                            );
                        } else {
                            return "";
                        }
                    })}
                </main>
            </section>
            <section className='bg-neutral  lg:pt-40 pb-10'>
                <header className='overflow-x-hidden container py-2.5'>
                    <h2>Top Categories</h2>
                </header>
                <main className='container py-2.5 flex lg:justify-evenly overflow-x-auto hide-scrollbar'>
                    {categoryList.map((category, i) => {

                        return (
                            <CategoryCard icon={category.icon}>
                                {category.title}
                            </CategoryCard>
                        );
                    })}
                </main>
            </section>
        </>
    );
};

export default ClientHome;