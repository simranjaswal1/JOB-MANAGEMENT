import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setJobs } from '@/redux/jobSlice';
import axios from 'axios';

const useGetAllJobs = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/api/jobs'); // Replace with your API endpoint
                dispatch(setJobs(response.data)); // Populate jobs in Redux store
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
            }
        };

        fetchJobs();
    }, [dispatch]);
};

export default useGetAllJobs;
