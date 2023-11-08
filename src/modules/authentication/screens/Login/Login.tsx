import { useAppDispatch, useAppSelector } from 'hooks';
import React, { useState } from 'react';
import { login } from '../store/AuthenticationReducer';
import { Link, useNavigate } from 'react-router-dom';

export const Login: React.FC = () => {
    const [error, setError] = useState('');
    const users = useAppSelector((state) => state.global.users);
    const dispatch = useAppDispatch(); 
    const navigate = useNavigate();
    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget as HTMLFormElement);
        const values = Object.fromEntries(data.entries());
        if (!values.username || !values.password) 
        {
            setError('Please fill out all fields');
            return;
        }
        const userData = users.find((user) => user.username === values.username);
        if (!userData) 
        {
            setError('User not found');
            return;
        }
        if (userData.password !== values.password) 
        {
            setError('Username or password is incorrect');
            return;
        }
        dispatch(login(userData));
        setError('');
        navigate('/app');
        
    }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4 form-inline">
            <input
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Username"
              name='username'
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Password"
              name='password'
            />
          </div>
          {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
          <Link to='/signup' className="text-blue-500 text-sm mt-4">Create Account</Link>
        </form>
      </div>
    </div>
  );
};


