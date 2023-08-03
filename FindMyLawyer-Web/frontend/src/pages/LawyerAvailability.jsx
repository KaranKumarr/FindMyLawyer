import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import AvailabilityCard from '../components/AvailabilityCard';
import axios from '../api/axios';

const LawyerAvailability = () => {

  const { auth } = useContext(AuthContext);
  const [availabilityData, setAvailabilityData] = useState({
    _id: '',
    schedule_days_runs: ['', '', '', '', '', '', ''],
    schedule_start_hours: ['', '', '', '', '', '', ''],
    schedule_end_hours: ['', '', '', '', '', '', '']
  });

  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`/availability`, {
          headers: {
            "Authorization": `Bearer ${auth.token}`
          }
        });
        if (response.data.availabilities === null) {
          const newResponse = await axios.post(`/availability`,
            {},
            {
              headers: {
                "Authorization": `Bearer ${auth.token}`
              }
            });
          setAvailabilityData(newResponse.data.availabilities);
          window.location.reload(false);
        } else {
          setAvailabilityData(response.data.availabilities);
        }
      } catch (error) {
        console.log(error);
      }

    };
    fetchData();


  }, [auth]);

  return (
    <main className='bg-neutral'>
      <section className='table-section'>
        <nav className='table-heading'>
          <h5 className='w-2/4'>Weekday</h5>
          <h5 className='w-full'>Start Time</h5>
          <h5 className='w-full'>End Time</h5>
          <h5 className='w-2/4'> </h5>
        </nav>
        <main>
          {
            availabilityData.schedule_days_runs[0] !== '' ?
              availabilityData.schedule_days_runs.map((weekday, index) => {
                return <AvailabilityCard
                  availabilityData={availabilityData} key={index} weekday={weekday}
                  setAvailabilityData={setAvailabilityData} index={index}
                  startHoursData={availabilityData.schedule_start_hours[index]}
                  endHoursData={availabilityData.schedule_end_hours[index]}
                />;
              })
              : <></>
          }

        </main>
      </section>
    </main>
  );
};

export default LawyerAvailability;