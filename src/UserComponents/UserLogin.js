import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

export default function UserLogin(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginValidation = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8091/api/v2/userValidation', {
            email: email,
            password: password
        });

        if (response.data) {
            props.setLoginState('user');
            sessionStorage.setItem('user', JSON.stringify(response.data));
            navigate('/user/userhome');
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
      <div className="flex min-h-screen items-center justify-center bg-black py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-950">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white dark:text-gray-50">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-200 dark:text-gray-400">
              Or
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                to='/user/userRegistration'
              >
                sign up for a new account
              </Link>
            </p>
          </div>
          <Form className="mt-8 space-y-6">
            <input defaultValue="true" name="remember" type="hidden" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <Form.Label className="text-white">Email address</Form.Label>
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
                <Form.Label className="text-white">Password</Form.Label>
                <InputGroup>
                  <FormControl
                    autoComplete="current-password"
                    placeholder="Password"
                    required
                    type="password"    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </div>
            </div>
            <div>
              <Button
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-900 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit" onClick={login}
              >
                Sign in
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}
