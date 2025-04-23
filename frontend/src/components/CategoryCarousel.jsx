import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'; // Ensure these are correctly imported
import { Button } from './ui/button'; // Ensure this is correctly imported
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import './CategoryCarousel.css'; // Ensure the CSS file is available and correct

// List of job categories
const categories = [
    "Software Developer/Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Cybersecurity Analyst",
    "Systems Analyst",
    "Cloud Engineer",
    "Database Administrator",
    "DevOps Engineer",
    "Web Developer",
    "IT Support Specialist"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to handle job search
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto my-20" style={{ backgroundColor: "#fff9f9" }}> {/* Background set to #fff9f9 */}
            <Carousel className="w-full">
                <CarouselContent>
                    {
                        categories.map((cat, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                >
                                    <Button
                                        onClick={() => searchJobHandler(cat)}
                                        variant="default"  // Default button variant
                                        className="rounded-full text-lg p-4 bg-transparent text-black border-2 border-black shadow-none"  // Transparent background, black border
                                    >
                                        {cat}
                                    </Button>
                                </motion.div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
