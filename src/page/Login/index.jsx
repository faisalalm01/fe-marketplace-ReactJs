import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../store/action'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_BASE_URL+'auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${formData.email}&password=${formData.password}`,
      });
      
      if (response.status === 200) {
        const data = await response.json();
        const token = data.data.token;
        // Simpan token ke localStorage
        localStorage.setItem('token', token);
        navigate('/')
        window.location.href = window.location.href;
        // Redirect ke halaman setelah login
      } else {
        navigate('/login')
        // Tangani kesalahan login
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return (
    <>
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden max-lg:px-10">
     <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
         <h1 className="text-3xl font-semibold text-center text-orange-700 underline">
           Sign in
         </h1>
         <form className="mt-6" onSubmit={handleSubmit}>
           <div className="mb-2">
             <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              value={formData.email}
              onChange={handleChange}
              name='email'
              type="email"
              className="block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              value={formData.password}
              name='password'
              onChange={handleChange}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-orange-700 bg-white border rounded-md focus:border-orange-400 focus:ring-orange-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-orange-700 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a
            onClick={() => navigate('/register')}
            href="#"
            className="font-medium text-orange-600 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
    </>
  );
}

export default Login