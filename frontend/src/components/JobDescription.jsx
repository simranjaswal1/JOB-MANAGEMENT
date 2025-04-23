import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Footer from './shared/Footer';
import Navbar from './shared/Navbar';

const JobDescription = () => {
    const { singleJob } = useSelector((store) => store.job);
    const { user } = useSelector((store) => store.auth);
    const [isApplied, setIsApplied] = useState(false);

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
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow p-6 max-w-4xl mx-auto my-10 bg-white rounded-lg shadow-xl border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="font-bold text-2xl text-gray-800">{singleJob?.title}</h1>
                        <div className="flex items-center gap-2 mt-4">
                            <Badge className="text-blue-700 font-bold" variant="ghost">
                                {singleJob?.position} Positions
                            </Badge>
                            <Badge className="text-red-600 font-bold" variant="ghost">
                                {singleJob?.jobType}
                            </Badge>
                            <Badge className="text-purple-700 font-bold" variant="ghost">
                                {singleJob?.salary} LPA
                            </Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-full px-6 py-3 text-lg font-bold transition-transform duration-300 ease-in-out ${
                            isApplied
                                ? 'bg-gray-400 text-white cursor-not-allowed'
                                : 'bg-green-600 text-white hover:scale-105'
                        }`}
                    >
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Job Description</h2>
                <div className="space-y-3">
                    <DetailRow label="Role" value={singleJob?.title} />
                    <DetailRow label="Location" value={singleJob?.location} />
                    <DetailRow label="Description" value={singleJob?.description} />
                    <DetailRow label="Experience" value={`${singleJob?.experience} yrs`} />
                    <DetailRow label="Salary" value={`${singleJob?.salary} LPA`} />
                    <DetailRow label="Total Applicants" value={singleJob?.applications?.length} />
                    <DetailRow label="Posted Date" value={new Date(singleJob?.createdAt).toLocaleDateString()} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

const DetailRow = ({ label, value }) => (
    <div className="text-sm text-gray-600">
        <span className="font-semibold">{label}:</span> {value}
    </div>
);

export default JobDescription;
