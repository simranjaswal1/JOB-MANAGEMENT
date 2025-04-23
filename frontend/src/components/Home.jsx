import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Chatbot from './Chatbot'; // Import the Chatbot component

const Home = () => {
  useGetAllJobs(); // Fetch all jobs
  const { user } = useSelector((store) => store.auth); // Get the authenticated user
  const jobs = useSelector((store) => store.job.jobs); // Get all jobs from Redux
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate('/'); // Redirect if user is a recruiter
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs jobs={jobs} /> {/* Pass all jobs explicitly */}
      <Footer />
      
      {/* Add Chatbot component to Home page */}
      <Chatbot />
    </div>
  );
};

export default Home;
