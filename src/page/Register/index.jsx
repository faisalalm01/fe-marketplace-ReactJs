import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../store/action'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const Register = () => {``
  const [data, setData] = useState({
    password: '',
    firstname: '',
    lastname: '',
    email: '',
  })
  const { Auth } = useSelector((state) => state)
  const navigate = useNavigate();
  // const handleClickShowPassword = () => {
  //     setData({ ...data, showPassword: !data.showPassword })
  // }
  const handleChange = (prop) => (event) => {
    setData({ ...data, [prop]: event.target.value });
  };
  const dispatch = useDispatch();
  const handleSubmit = () => {
    const dataSubmit = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
    };
    dispatch(registerUser(dataSubmit));
  };
  console.log(Auth?.dataRegister);
  useEffect(() => {
    if (Auth?.dataRegister) {
      navigate('/')
    } else {
      // setData(false)
      console.log('error register user');
    }
  }, [Auth.dataRegister])

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold text-purple-600">
              Logo
            </h3>
          </a>
        </div>
        <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
          <form>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                firstname
              </label>
              <div className="flex flex-col items-start">
                <input
                  type='text'
                  id='firstname'
                  name='firstname'
                  placeholder='Masukan nama depan anda'
                  className='w-full bg-form-primary rounded-lg border border-gray-700 outline-2 outline-form-secondry text-background-primary text-lg normal-case py-1 px-3 leading-8'
                  onChange={handleChange('firstname')}
                  value={data.firstname}
                // type="text"
                // name="name"
                // className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                lastname
              </label>
              <div className="flex flex-col items-start">
                <input
                  type='text'
                  id='lastname'
                  name='lastname'
                  placeholder='Masukan nama belakang anda'
                  className='w-full bg-form-primary rounded-lg border border-gray-700 outline-2 outline-form-secondry text-background-primary text-lg normal-case py-1 px-3 leading-8'
                  onChange={handleChange('lastname')}
                  value={data.lastname}
                // type="password"
                // name="password_confirmation"
                // className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Email
              </label>
              <div className="flex flex-col items-start">
                <input
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Masukan email anda'
                  className='w-full bg-form-primary rounded-lg border border-gray-700 outline-2 outline-form-secondry text-background-primary text-lg normal-case py-1 px-3 leading-8'
                  onChange={handleChange('email')}
                  value={data.email}
                // type="email"
                // name="email"
                // className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Password
              </label>
              <div className="flex flex-col items-start">
                <input
                  type='password'
                  id='sandi'
                  name='password'
                  placeholder='Masukan sandi anda'
                  className='w-full bg-form-primary border-none text-background-primary text-lg normal-case py-1 px-3 leading-8 outline-form-secondry'
                  onChange={handleChange('password')}
                  value={data.password}
                // type="password"
                // name="password"
                // className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex items-center justify-end mt-4">
              <a
                onClick={() => navigate('/login')}
                className="text-sm text-gray-600 underline hover:text-gray-900"
                href="#"
              >
                Already registered?
              </a>
              <button
                onClick={handleSubmit}
                // type="submit"
                className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register