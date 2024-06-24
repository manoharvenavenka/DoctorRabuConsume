import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

export default function PharmacyLogin(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginValidation = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8091/api/v2/pharmacyValidation', {
            email: email,
            password: password
        });

        if (response.data) {
            props.setLoginState('pharmacy');
            sessionStorage.setItem('pharmacy', JSON.stringify(response.data));
            navigate('/pharmacy/pharmacyhome');
        } else {
            alert('Invalid Email or Password'); 
        }
    } catch (error) {
        alert('Invalid Email or Password'); 
    }
};

  const login = (e) => {
      e.preventDefault();
      loginValidation(email, password);
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-950">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Or
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                to='/pharmacy/pharmacyRegistration' 
              >
                sign up for a new account
              </Link>
            </p>
          </div>
          <Form className="mt-8 space-y-6">
            <input defaultValue="true" name="remember" type="hidden" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <Form.Label>Email address</Form.Label>
                <InputGroup>
                  <FormControl
                    autoComplete="email"
                    placeholder="Email address"
                    required
                    type="email"                                 onChange={(e) => setEmail(e.target.value)}

                  />
                </InputGroup>
              </div>
              <div>
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <FormControl
                    autoComplete="current-password"
                    placeholder="Password"
                    required
                    type="password"  onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </div>
            </div>
         
             
   
            <div>
              <Button
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-400 dark:text-gray-950 dark:hover:bg-indigo-300 dark:focus:ring-indigo-300"
                type="submit" onClick={login}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                </span>
                Sign in
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}