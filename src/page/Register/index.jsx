import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../store/action'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:2024/api/auth/register', formData);
      console.log(response.data);
      if (response.data.status === 200) {
        console.log(response.data.msg);
        navigate('/login')
      } else if (response.data.status === 401) {
        console.log(response.data.error);
      } else {
        console.log(response.data.error);
        console.error('Gagal melakukan registrasi.');
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <>
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
     <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
         <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
           Sign up
         </h1>
         <form className="mt-6" onSubmit={handleSubmit}>
           <div className="mb-2">
             <label
              htmlFor="firstname"
              className="block text-sm font-semibold text-gray-800"
            >
              firstname
            </label>
            <input
              value={formData.firstname}
              onChange={handleInputChange}
              name='firstname'
              type="firstname"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="lastname"
              className="block text-sm font-semibold text-gray-800"
            >
              lastname
            </label>
            <input
              value={formData.lastname}
              name='lastname'
              onChange={handleInputChange}
              type="lastname"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              email
            </label>
            <input
              value={formData.email}
              name='email'
              onChange={handleInputChange}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
              onChange={handleInputChange}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Register
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          already have an account?{" "}
          <a
            onClick={() => navigate('/login')}
            href="#"
            className="font-medium text-purple-600 hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
    </>
  )
}

export default Register