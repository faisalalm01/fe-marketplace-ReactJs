import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../store/action'

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { Auth } = useSelector((state) => state);

    const handleChange = (prop) => (event) => {
        setData({ ...data, [prop]: event.target.value });
    };
    const handleSubmit = () => {
        const dataSubmit = {
            email: data.email,
            password: data.password
        };
        dispatch(loginUser(dataSubmit));
    };

    console.log(Auth);

    // useEffect(() => {
    //     if (Auth?.dataLogin?.code === 200) {
    //         navigate('/');
    //     } else if (
    //       Auth?.dataLogin?.response?.data?.code === 400 ||
    //       Auth?.dataLogin?.response?.data?.code === 401
    //     ){
    //         navigate('/login')
    //     } else if(Auth?.dataLogin) {
    //         navigate('/')
    //     }
    // }, [Auth.dataLogin])
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                    Sign in
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
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
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="#"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
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
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login