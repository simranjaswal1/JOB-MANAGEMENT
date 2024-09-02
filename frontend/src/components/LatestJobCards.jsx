import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();
    const [sparkles, setSparkles] = useState([]);

    const handleHover = (e) => {
        const rect = e.target.getBoundingClientRect();
        const sparkle = {
            left: e.clientX - rect.left,
            top: e.clientY - rect.top,
        };
        setSparkles([...sparkles, sparkle]);

        // Remove sparkles after the animation completes
        setTimeout(() => {
            setSparkles((prev) => prev.slice(1));
        }, 800);
    };

    return (
        <motion.div
            onClick={() => navigate(`/description/${job._id}`)}
            className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer relative overflow-hidden'
            whileHover={{ scale: 1.05}}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onMouseMove={handleHover}
        >
            {sparkles.map((sparkle, index) => (
                <div
                    key={index}
                    className="sparkle"
                    style={{ left: `${sparkle.left}px`, top: `${sparkle.top}px` }}
                />
            ))}

            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>
        </motion.div>
    );
}

export default LatestJobCards;
