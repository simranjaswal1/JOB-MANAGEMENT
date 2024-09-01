import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const isInitiallyApplied = singleJob?.applications?.some(
        (application) => application.applicant === user?._id
    ) || false;
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

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
            toast.error(error.response?.data?.message || 'Something went wrong');
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
                toast.error('Failed to fetch job details');
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className='flex items-center justify-center min-h-screen bg-black p-4'>
            <div className='relative w-full max-w-lg bg-gray-800 text-white rounded-xl shadow-xl transform transition-transform hover:scale-105 overflow-hidden'>
                <div className='flex flex-col p-6'>
                    <div className='flex items-center justify-between mb-6'>
                        <div>
                            <h1 className='text-3xl font-extrabold text-red-500 mb-2'>{singleJob?.title}</h1>
                            <div className='flex items-center gap-2'>
                                <Badge className='bg-blue-200 text-blue-800' variant="ghost">
                                    {singleJob?.position} Positions
                                </Badge>
                                <Badge className='bg-red-200 text-red-800' variant="ghost">
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className='bg-purple-200 text-purple-800' variant="ghost">
                                    {singleJob?.salary} LPA
                                </Badge>
                            </div>
                        </div>
                        <Button
                            onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied}
                            className={`button ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-primary text-white'}`}
                        >
                            {isApplied ? 'Already Applied' : 'Apply Now'}
                        </Button>
                    </div>
                    <div className='border-t-2 border-gray-600 pt-4'>
                        <h2 className='border-b-2 border-b-gray-600 text-xl font-semibold text-red-500 py-2 mb-4'>
                            Job Description
                        </h2>
                        <div className='space-y-2'>
                            <DetailRow label="Role" value={singleJob?.title} />
                            <DetailRow label="Location" value={singleJob?.location} />
                            <DetailRow label="Description" value={singleJob?.description} />
                            <DetailRow label="Experience" value={`${singleJob?.experience} yrs`} />
                            <DetailRow label="Salary" value={`${singleJob?.salary} LPA`} />
                            <DetailRow label="Total Applicants" value={singleJob?.applications?.length} />
                            <DetailRow label="Posted Date" value={new Date(singleJob?.createdAt).toLocaleDateString()} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DetailRow = ({ label, value }) => (
    <h3 className='font-semibold text-lg'>
        {label}: <span className='font-normal'>{value}</span>
    </h3>
);

export default JobDescription;
