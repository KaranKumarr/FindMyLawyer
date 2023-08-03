import React, { useContext, useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import moment from 'moment';


const getTimeIn12Hrs = (timing) => {
  let hour = parseInt(timing?.split(":")[0]) % 12;
  let timeInAmPm = (hour === 0 ? "12" : hour) + ":" + timing?.split(":")[1] + " " + (parseInt(parseInt(timing?.split(":")[0]) / 12) < 1 ? "am" : "pm");
  return timeInAmPm;
};

const APPOINTMENT_URL = 'appointments/';
const LawyerAddSummary = () => {

  const { auth } = useContext(AuthContext);

  const [currentAppointmentStatus, setCurrentAppointmentStatus] = useState(false);
  const [summary, setSummary] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [appointmentDetail, setAppointmentDetails] = useState({});

  const { appointmentId } = useParams();

  useEffect(() => {

    const fetchData = async () => {
      const { data } = await axios.get(APPOINTMENT_URL + appointmentId, {
        headers: {
          "Authorization": `Bearer ${auth.token}`
        }
      });
      setCurrentAppointmentStatus(data.status);
      setAppointmentDetails(data);
      setSummary(data.summary);
      console.log(data);
    };

    fetchData();

  }, [appointmentId, auth.token]);


  const changeAppointmentStatus = async (value) => {
    setCurrentAppointmentStatus(value);
    const updatedAppointmentDetails = await axios.put(APPOINTMENT_URL + appointmentId,
      { status: value },
      {
        headers: {
          "Authorization": `Bearer ${auth.token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );
    console.log(updatedAppointmentDetails);
  };

  const handleSummaryChange = (e) => {
    if (currentAppointmentStatus === "true") {
      setSummary(e.target.value);
      setErrorMsg('');
    } else {
      setErrorMsg("Cannot edit because Appointment is still pending");
    }
  };

  const handleSummaryUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedAppointmentDetails = await axios.put(APPOINTMENT_URL + appointmentId,
        { summary },
        {
          headers: {
            "Authorization": `Bearer ${auth.token}`,
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );

      setAppointmentDetails(updatedAppointmentDetails);
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <section className='container flex flex-col gap-10 py-10'>

      <main className='p-5 flex flex-col gap-5 bg-primary bg-opacity-20 rounded-lg text-neutral-contrast w-full'>

        <h4 className='font-semibold'>
          Appointment Details
        </h4>
        <div className='flex flex-wrap'>

          <span className='flex flex-col gap-1 w-1/3 pb-5 pr-5'>
            <h5 className='font-semibold'>
              Name
            </h5>
            <p className='font-medium'>
              {appointmentDetail.clientName}
            </p>
          </span>

          <span className='flex flex-col gap-1 w-1/3 pb-5 pr-5'>
            <h5 className='font-semibold'>
              Appointment Status
            </h5>
            <select
              onChange={(event) => changeAppointmentStatus(event.target.value)}
              value={currentAppointmentStatus}
              className='standard-input w-2/4' name="appointmentStatus" id="appointmentDetail">
              <option className='standard-input' value={false}>Pending</option>
              <option className='standard-input' value={true}>Complete</option>
            </select>
          </span>

          <span className='flex flex-col gap-1 w-1/3 pb-5 pr-5'>
            <h5 className='font-semibold'>
              Timing
            </h5>
            <p className='font-medium'>
              {getTimeIn12Hrs(appointmentDetail.appointmentTiming)} -  {moment(appointmentDetail.appointmentDate).format("DD MMM YYYY")}
            </p>
          </span>

          <span className='flex flex-col gap-1 w-1/3 pb-5 pr-5'>
            <h5 className='font-semibold'>
              Lawyer
            </h5>
            <p className='font-medium'>
              {auth.name}
            </p>
          </span>

          <span className='flex flex-col gap-1 w-1/3 pb-5 pr-5'>
            <h5 className='font-semibold'>
              Contact
            </h5>
            <p className='font-medium'>
              {appointmentDetail.phoneNumber}
            </p>
          </span>

        </div>


        <form onSubmit={handleSummaryUpdate} className='w-full'>
          <h4 className='font-semibold'>
            Case/Meeting Summary
          </h4>
          <textarea
            onChange={handleSummaryChange}
            className='standard-input w-full resize-y'
            value={summary} name="summary" id="summary" rows="10">
          </textarea>
          <div className='flex justify-between items-center'>
            <h6 className='font-semibold text-exception'>{errorMsg}</h6>
            <button className='float-right primary-btn' type="submit">Update</button>
          </div>
        </form>

      </main>

    </section>
  );
};

export default LawyerAddSummary;