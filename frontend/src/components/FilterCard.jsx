import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useLocation } from 'react-router-dom';

const filterData = [
    {
        filterType: 'Location',
        array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
    },
    {
        filterType: 'Industry',
        array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
    },
    {
        filterType: 'Salary',
        array: ['0-40k', '42-1lakh', '1lakh to 5lakh'],
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();

    // Function to handle the filter change
    const changeHandler = (value) => {
        setSelectedValue(value);
        localStorage.setItem('selectedFilter', value); // Persist the selected value to localStorage
    };

    // Dispatch the selected filter value to Redux store
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue)); // This dispatches the filter state to Redux store
    }, [selectedValue, dispatch]);

    // Restore the filter value from localStorage on component mount
    useEffect(() => {
        const savedFilter = localStorage.getItem('selectedFilter');
        if (savedFilter) {
            setSelectedValue(savedFilter); // Set the saved filter value if exists
        }
    }, []);

    // Reset the filter when navigating back to the home page (or root path)
    useEffect(() => {
        if (location.pathname === '/') {
            setSelectedValue('');  // Reset selected filter when on the home page
            dispatch(setSearchedQuery('')); // Reset Redux state as well
            localStorage.removeItem('selectedFilter'); // Clear the saved filter from localStorage
        }
    }, [location, dispatch]);

    // Handle the "Clear Filter" button click to reset filter state
    const handleClearFilter = () => {
        // Reset the selected value, Redux store, and localStorage
        setSelectedValue(''); // Reset the selected filter
        dispatch(setSearchedQuery('')); // Reset the Redux store filter
        localStorage.removeItem('selectedFilter'); // Remove from localStorage
    };

    return (
        <div className="w-full bg-white p-3 rounded-md">
            <h1 className="font-bold text-lg">Filter Jobs</h1>
            <hr className="mt-3" />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index}>
                        <h1 className="font-bold text-lg">{data.filterType}</h1>
                        {data.array.map((item, idx) => {
                            const itemId = `id${index}-${idx}`;
                            return (
                                <div key={itemId} className="flex items-center space-x-2 my-2">
                                    <RadioGroupItem value={item} id={itemId} />
                                    <Label htmlFor={itemId}>{item}</Label>
                                </div>
                            );
                        })}
                    </div>
                ))}
            </RadioGroup>

            {/* Clear Filter styled as a radio button */}
            <div className="flex items-center space-x-2 my-4">
                <input
                    type="radio"
                    id="clearFilter"
                    name="filterReset"
                    checked={selectedValue === ''} // Ensure this condition resets correctly
                    onChange={handleClearFilter} // Ensure this triggers the filter reset
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded-full focus:ring-blue-500"
                />
                <Label htmlFor="clearFilter" className="text-sm text-gray-700 cursor-pointer">
                    Clear Filter
                </Label>
            </div>
        </div>
    );
};

export default FilterCard;
