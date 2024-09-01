import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import './Jobdes.css';  // Import the CSS file

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(
        (application) => application.applicant === user?._id
    ) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);
    const [sparkles, setSparkles] = useState([]);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
                withCredentials: true,
            });

            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = {
                    ...singleJob,
                    applications: [...singleJob.applications, { applicant: user?._id }],
                };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
                    withCredentials: true,
                });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(
                        res.data.job.applications.some(
                            (application) => application.applicant === user?._id
                        )
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setSparkles((prev) => [
            ...prev,
            { x, y, id: Date.now() }
        ]);

        setTimeout(() => {
            setSparkles((prev) => prev.filter((s) => s.id !== Date.now()));
        }, 2000);
    };

    return (
        <div className='relative max-w-7xl mx-auto my-10 p-6 gradient-bg rounded-lg shadow-2xl overflow-hidden sparkles' onMouseMove={handleMouseMove}>
            {sparkles.map((sparkle, index) => (
                <div
                    key={index}
                    className='sparkle'
                    style={{
                        left: `${sparkle.x}px`,
                        top: `${sparkle.y}px`,
                        width: `${Math.random() * 10 + 5}px`,
                        height: `${Math.random() * 10 + 5}px`,
                        animationDuration: `${Math.random() * 1 + 1}s`
                    }}
                />
            ))}
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-extrabold text-3xl text-white mb-2'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className='bg-blue-200 text-blue-800 font-semibold shadow-lg' variant="ghost">
                            {singleJob?.position} Positions
                        </Badge>
                        <Badge className='bg-red-200 text-red-800 font-semibold shadow-lg' variant="ghost">
                            {singleJob?.jobType}
                        </Badge>
                        <Badge className='bg-purple-200 text-purple-800 font-semibold shadow-lg' variant="ghost">
                            {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`relative rounded-full px-6 py-3 text-lg font-bold text-white transition-transform duration-300 ease-in-out ${
                        isApplied
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover-effect'
                    }`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>
            <h2 className='border-b-2 border-b-gray-300 text-xl font-semibold text-white py-4 mt-6'>
                Job Description
            </h2>
            <div className='my-4 text-white'>
                <h3 className='font-semibold text-lg my-2'>
                    Role: <span className='pl-4 font-normal'>{singleJob?.title}</span>
                </h3>
                <h3 className='font-semibold text-lg my-2'>
                    Location: <span className='pl-4 font-normal'>{singleJob?.location}</span>
                </h3>
                <h3 className='font-semibold text-lg my-2'>
                    Description: <span className='pl-4 font-normal'>{singleJob?.description}</span>
                </h3>
                <h3 className='font-semibold text-lg my-2'>
                    Experience: <span className='pl-4 font-normal'>{singleJob?.experience} yrs</span>
                </h3>
                <h3 className='font-semibold text-lg my-2'>
                    Salary: <span className='pl-4 font-normal'>{singleJob?.salary} LPA</span>
                </h3>
                <h3 className='font-semibold text-lg my-2'>
                    Total Applicants: <span className='pl-4 font-normal'>{singleJob?.applications?.length}</span>
                </h3>
                <h3 className='font-semibold text-lg my-2'>
                    Posted Date: <span className='pl-4 font-normal'>{singleJob?.createdAt.split('T')[0]}</span>
                </h3>
            </div>
        </div>
    );
};

export default JobDescription;
