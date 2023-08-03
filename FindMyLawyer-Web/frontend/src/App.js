import { useContext, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import './App.css';
import AuthContext from './context/AuthProvider';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from "./pages/Login";
import LawyerSignUp from "./pages/LawyerSignUp";
import LawyerDashboard from "./pages/LawyerDashboard";
import PageNotFound from "./pages/PageNotFound";
import LawyerReview from "./pages/LawyerReview";
import LawyerAppointments from "./pages/LawyerAppointments";
import LawyerAvailability from "./pages/LawyerAvailability";
import ClientHome from "./pages/ClientHome";
import LawyerProfileView from "./pages/LawyerProfileView";
import LawyerReviewsView from "./pages/LawyerReviewsView";
import LawyerBookAppointment from "./pages/LawyerBookAppointment";
import ClientAppointmentHistory from "./pages/ClientAppointmentHistory";
import AppointmentDetails from "./pages/AppointmentDetails";
import LawyersSearching from "./pages/LawyersSearching";
import ClientSignUp from "./pages/ClientSignUp";
import LawyerAddSummary from "./pages/LawyerAddSummary";
import AdminDashboard from "./pages/AdminDashboard";

function App() {


  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/logout') {
      setAuth(null);
      localStorage.removeItem('auth');
      navigate("/login");
    }
    // if (location.pathname === '/about-us') {
    //   navigate("/");
    // }
  }, [location, setAuth, navigate, auth]);

  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/admin" element={auth?.userType === 'admin' ? <AdminDashboard /> : <Navigate to='/login' />} />


        <Route path="/" element={!auth ? <Home /> : (auth?.userType === 'lawyer' ? <Navigate to='/dashboard' /> : (auth?.userType === 'client' ? <Navigate to={'/lawyers'} /> : <Navigate to={'/admin'} />))} />

        <Route path="/login" element={!auth ? <Login /> : (<Navigate to={'/'} />)} />

        <Route path="/logout" element={<></>} />

        <Route path="/signup-lawyer" element={!auth ? <LawyerSignUp /> : (auth?.userType === 'lawyer' ? <Navigate to='/dashboard' /> : <Navigate to={'/lawyers'} />)} />

        <Route path="/dashboard" element={auth?.userType === 'lawyer' ? <LawyerDashboard /> : <Navigate to='/login' />} />

        <Route path="/reviews" element={auth?.userType === 'lawyer' ? <LawyerReview /> : <Navigate to='/login' />} />

        <Route path="/appointments" element={auth?.userType === 'lawyer' ? <LawyerAppointments /> : <Navigate to='/login' />} />

        <Route path="/appointments/summary/:appointmentId" element={auth?.userType === 'lawyer' ? <LawyerAddSummary /> : <Navigate to='/login' />} />

        <Route path="/availability" element={auth?.userType === 'lawyer' ? <LawyerAvailability /> : <Navigate to='/login' />} />

        <Route path="/lawyers" element={auth?.userType === 'client' ? <ClientHome /> : <Navigate to={'/login'} />} />

        <Route path="/lawyers/search/:query" element={auth?.userType === 'client' ? <LawyersSearching /> : <Navigate to={'/login'} />} />

        <Route path="/lawyer/:id" element={auth?.userType === 'client' ? <LawyerProfileView /> : <Navigate to={'/login'} />} />

        <Route path="/lawyer/:id/reviews" element={auth?.userType === 'client' ? <LawyerReviewsView /> : <Navigate to={'/login'} />} />

        <Route path="/lawyer/:id/book" element={auth?.userType === 'client' ? <LawyerBookAppointment /> : <Navigate to={'/login'} />} />

        <Route path="/history" element={auth?.userType === 'client' ? <ClientAppointmentHistory /> : <Navigate to={'/login'} />} />

        <Route path="/history/:id" element={auth?.userType === 'client' ? <AppointmentDetails /> : <Navigate to={'/login'} />} />

        <Route path="/appointments/:id" element={auth?.userType === 'client' ? <AppointmentDetails /> : <Navigate to={'/login'} />} />

        <Route path="/signup-client" element={<ClientSignUp />} />


        {/* 👇️ only match this when no other routes match */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
