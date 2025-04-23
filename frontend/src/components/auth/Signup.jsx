import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react'; // Import the eye icons

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Regex to validate fullname (only letters and spaces, no leading or trailing spaces)
    const validateFullname = (name) => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(name.trim()) && name.trim().length > 0;
    }

    // Regex to validate email (must end with @gmail.com)
    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return regex.test(email);
    }

    // Regex to validate phone number (only digits, exactly 10 digits, and not all zeros)
    const validatePhoneNumber = (phone) => {
        const regex = /^[0-9]{10}$/;
        // Check if the phone number is 10 digits and not all zeros
        return regex.test(phone) && phone !== "0000000000";
    }

    // Regex to validate password (at least 6 characters, must contain at least one alphabet and one digit)
    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
        return regex.test(password);
    }

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // Validate fullname
        if (!validateFullname(input.fullname)) {
            toast.error("Full Name should only contain alphabets and spaces and should not start with spaces.");
            return;
        }

        // Validate email
        if (!validateEmail(input.email)) {
            toast.error("Email must be in the format: example@gmail.com.");
            return;
        }

        // Validate phone number
        if (!validatePhoneNumber(input.phoneNumber)) {
            toast.error("Phone number must be exactly 10 digits long and cannot be all zeros.");
            return;
        }

        // Validate password
        if (!validatePassword(input.password)) {
            toast.error("Password must be at least 6 characters long, contain at least one alphabet and one digit.");
            return;
        }

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    return (
        <div className="bg-background text-foreground min-h-screen">
            <Navbar />
            <div className="flex items-center justify-center max-w-7xl mx-auto">
                <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-6 my-10 bg-white text-gray-800 shadow-lg">
                    <h1 className="font-bold text-xl mb-5">Sign Up</h1>
                    <div className="my-2">
                        <Label>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Enter your Name"
                            className="bg-gray-100 shadow-none focus:ring-primary"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter your Email"
                            className="bg-gray-100 shadow-none focus:ring-primary"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Enter Phone No."
                            className="bg-gray-100 shadow-none focus:ring-primary"
                        />
                    </div>
                    <div className="my-2">
                        <Label>Password</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={input.password}
                                name="password"
                                onChange={changeEventHandler}
                                placeholder="Enter your Password"
                                className="bg-gray-100 shadow-none focus:ring-primary"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between my-5">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="h-5 w-5 text-primary border-none rounded-full focus:ring-0"
                                />
                                <Label>Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="h-5 w-5 text-primary border-none rounded-full focus:ring-0"
                                />
                                <Label>Recruiter</Label>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Label>Profile</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer"
                        />
                    </div>
                    {loading ? (
                        <Button className="w-full my-4 bg-gray-300 text-gray-600">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4 bg-gray-600 text-white">
                            Signup
                        </Button>
                    )}
                    <span className="text-sm">
                        Already have an account? <Link to="/login" className="text-secondary">Login</Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Signup;
