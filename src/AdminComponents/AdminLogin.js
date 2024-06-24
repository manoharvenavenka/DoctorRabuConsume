import  { React,useState } from 'react'

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminLogin(Props) {
    let [username, setUsername] = useState("");
    let [password, setPassword] = useState("");
    let { loginState, setLoginState } = Props;
    const navigate = useNavigate();

    const loginValidation = async (username, password) => {

        const response = await axios.post('http://localhost:8091/api/v2/adminValidation', {
            userName: username,
            password: password
        });

        console.log(response.data);

        if (response.data === true) {
            setLoginState('admin');
            navigate('/admin/adminhome');

        }else {
            alert('Invalid username or password.'); // Display invalid username/password message
        }
        // alert('LoginSuccesfully.');
    };


    const login = (e) => {
        e.preventDefault();
        loginValidation(username, password);
    }
    return (
   
<>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                            Admin Login
                        </h2>
                    </div>
                    <form action="#" className="space-y-6" method="POST">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="username">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    autoComplete="username"
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm"
                                    id="userName"
                                    name="userName"
                                    required
                                    type="text" onChange={(e) => setUsername(e.target.value)} 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password" >
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    autoComplete="current-password"
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500 sm:text-sm"
                                    id="password"
                                    name="password"
                                    required
                                    type="password"  onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <button type='submit' className='btn btn-primary form-control justify-content-center'
                                onClick={login} style={{ width: "200px" }}>Login</button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}