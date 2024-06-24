import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function DoctorLogin(props) {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginValidation = async (email, password) => {
        const response = await axios.post('http://localhost:8091/api/v2/doctorValidation', {
            email: email,
            password: password
        });

        console.log(response.data.status);

        if (response.data.status === 'Active') {
            props.setLoginState('doctor');
            sessionStorage.setItem('doctor', JSON.stringify(response.data));
            navigate('/doctor/doctorhome');
        } else if (response.data.status === 'Inactive') {
            alert('Your Email Is Under Verification. Please Try To Login After Few Moments'); 
        } else {
            alert('Invalid Email or Password'); 
        }
    };

    const login = (e) => {
        e.preventDefault();
        loginValidation(email, password);
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 md:p-10 lg:p-12">
                    <h2 className="text-2xl font-bold mb-6 text-center">Doctor Login</h2>
                    <form>
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                id="email"
                                placeholder="Enter your email"
                                required
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                id="password"
                                placeholder="Enter your password"
                                required
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-between items-center mb-6">
                           
                        </div>
                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            type="submit"  onClick={login}
                        >
                            Sign In
                        </button>
                        <div className="text-center mt-4">
                            <Link
                                className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 text-sm"
                                to='/doctor/doctorRegistration'>
                                New Registration
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
