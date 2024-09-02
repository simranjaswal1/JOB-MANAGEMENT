import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // Staggering effect
                delayChildren: 0.5, // Delays starting all children animations
                duration: 1.5,
                ease: "easeOut",
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className='text-center'>
            <motion.div
                className='flex flex-col gap-5 my-10'
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.span
                    className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'
                    variants={itemVariants}
                    transition={{ duration: 2.5 }} // Smooth easing
                >
                    A platform for your dreams
                </motion.span>
                <motion.h1
                    className='text-5xl font-bold'
                    variants={itemVariants}
                    transition={{ duration: 3 }} // More pronounced animation
                >
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </motion.h1>
                <motion.p
                    variants={itemVariants}
                    transition={{ duration: 3.5 }} // Extended duration
                >
                    Effortlessly manage job postings, applications, and candidate interactions with our comprehensive job management platform
                </motion.p>
                <motion.div
                    className='flex w-[40%] shadow-lg border border-gray-200 rounded-full items-center mx-auto'
                    variants={itemVariants}
                    transition={{ duration: 4}} // Slower and smoother
                >
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full bg-transparent text-gray-800 placeholder-gray-400 rounded-l-full px-4 py-2'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#224fa1] border-none">
                        <Search className='h-5 w-5 text-white' />
                    </Button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
