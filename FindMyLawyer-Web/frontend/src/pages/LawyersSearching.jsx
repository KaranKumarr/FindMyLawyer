import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBox from '../components/SearchBox';
import LawyerCard from '../components/LawyerCard';
import axios from '../api/axios';


const SEARCH_LAWYERS_URL = '/lawyers/search/';
const LawyersSearching = () => {

    const { query } = useParams();

    const [searchQuery, setSearchQuery] = useState(query);
    const [lawyers, setLawyers] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchData = async () => {
            try {

                const { data } = await axios.get(SEARCH_LAWYERS_URL + query, {});

                setLawyers(data.lawyers);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();

    }, [query]);

    const handleSearching = (e) => {
        navigate(`/lawyers/search/${searchQuery}`);
        e.preventDefault();
    };


    return (
        <section className='container py-10 flex flex-col gap-10'>

            <header className='flex justify-center w-full '>
                <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearching={handleSearching} />
            </header>
            <main>
                <h4>Search results for {query}</h4>
                <main className='py-2.5 flex flex-wrap'>
                    {lawyers.map((lawyer, i) => {
                        return (
                            <LawyerCard lawyer={lawyer} key={i} />
                        );
                    })}
                </main>
            </main>


        </section>
    );
};

export default LawyersSearching;