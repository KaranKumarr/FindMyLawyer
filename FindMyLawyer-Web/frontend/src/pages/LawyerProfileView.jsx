import React, { useContext } from 'react';
import LawyerProfileHeader from '../components/LawyerProfileHeader';
import CurrentLawyerContext from '../context/CurrentLawyerProvider';
import { useNavigate } from 'react-router-dom';


const LawyerProfileView = () => {

    const { currentLawyer } = useContext(CurrentLawyerContext);
    const navigate = useNavigate();

    const timing = {
        "schedule_days_runs": [
            "mon",
            "tue",
            "wed",
            "thu",
            "fri",
            "sat",
            "sun"
        ],
        "schedule_start_hours": [
            "08:00",
            "09:00",
            "09:00",
            "09:00",
            "10:00",
            "",
            ""
        ],
        "schedule_end_hours": [
            "13:30",
            "18:00",
            "18:00",
            "18:00",
            "18:00",
            "",
            ""
        ]
    };

    const navigateToKeywordSearch = (expertise) => {

        navigate(`/lawyers/search/${expertise}`);

    };

    return (
        <section className='container flex flex-col gap-10 py-10'>

            <LawyerProfileHeader lawyer={currentLawyer} />

            <main className='p-5 flex flex-col gap-5 bg-primary bg-opacity-20 rounded-lg'>

                <section className='flex flex-col gap-2.5'>
                    <h5 className='font-semibold text-neutral-contrast'>About {currentLawyer.name}</h5>
                    <p className='text-neutral-contrast'>
                        {currentLawyer.description}
                    </p>
                </section>

                <section className='flex flex-col gap-2.5'>
                    <h5 className='font-semibold text-neutral-contrast'>Expertise</h5>
                    <div className='flex flex-wrap'>
                        {
                            currentLawyer.keywords.map((expertise, i) => {
                                return (
                                    <div onClick={() => { navigateToKeywordSearch(expertise); }} key={i} className='category-tag'>
                                        {expertise}
                                    </div>);
                            })
                        }
                    </div>
                </section>

                <section className='flex flex-col gap-2.5'>
                    <h5 className='font-semibold text-neutral-contrast'>
                        Timings
                    </h5>
                    <div className='flex flex-col gap-2.5'>
                        {
                            timing.schedule_start_hours.map((start_hours, i) => {
                                if (start_hours !== "") {
                                    return (
                                        <div className='timing-line'>
                                            <h6>
                                                {timing.schedule_days_runs[i]}
                                            </h6>

                                            <p>
                                                {timing.schedule_start_hours[i]}
                                            </p>

                                            <p>
                                                {timing.schedule_end_hours[i]}
                                            </p>
                                        </div>
                                    );
                                } else {
                                    return "";
                                }
                            })
                        }
                    </div>
                </section>


                <section className='flex flex-col gap-2.5'>
                    <h5 className='font-semibold text-neutral-contrast'>Location</h5>
                    <p className='text-neutral-contrast'>
                        {currentLawyer.address}
                    </p>
                </section>

                <section className='flex flex-col gap-2.5'>
                    <h5 className='font-semibold text-neutral-contrast'>Contact</h5>
                    <p className='text-neutral-contrast'>
                        {currentLawyer.phone}
                    </p>
                </section>

            </main>

        </section>
    );
};

export default LawyerProfileView;