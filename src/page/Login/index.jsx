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
      const response = await fetch('http://localhost:2024/api/auth/login', {
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
        console.log(data.data);
        localStorage.setItem('token', token);
        navigate('/')
        // Redirect ke halaman setelah login
      } else {
        // Tangani kesalahan login
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const token = localStorage.getItem('token');
  console.log(token);
  //  const [data, setData] = useState({
  //       email: '',
  //       password: ''
  //   })
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const { Auth } = useSelector((state) => state);

  //   const handleChange = (prop) => (event) => {
  //       setData({ ...data, [prop]: event.target.value });
  //   };
  //   const handleSubmit = () => {
  //       const dataSubmit = {
  //           email: data.email,
  //           password: data.password
  //       };
  //       dispatch(loginUser(dataSubmit));
  //   };

  //   console.log(Auth);

  //   useEffect(() => {
  //       if (Auth?.dataLogin?.status === 200) {
  //           navigate('/');
  //       } else if (
  //         Auth?.dataLogin?.response?.data?.status === 400 ||
  //         Auth?.dataLogin?.response?.data?.status === 401
  //       ){
  //           navigate('/login')
  //       } else if(Auth?.dataLogin) {
  //           navigate('/')
  //       }
  //   }, [Auth.dataLogin])

  return (
    <div>
      <h2>Formulir Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
  // const [data, setData] = useState({
  //     email: '',
  //     password: ''
  // })
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { Auth } = useSelector((state) => state);

  // const handleChange = (prop) => (event) => {
  //     setData({ ...data, [prop]: event.target.value });
  // };
  // const handleSubmit = () => {
  //     const dataSubmit = {
  //         email: data.email,
  //         password: data.password
  //     };
  //     dispatch(loginUser(dataSubmit));
  // };

  // console.log(Auth);

  // useEffect(() => {
  //     if (Auth?.dataLogin?.status === 200) {
  //         navigate('/');
  //     } else if (
  //       Auth?.dataLogin?.response?.data?.status === 400 ||
  //       Auth?.dataLogin?.response?.data?.status === 401
  //     ){
  //         navigate('/login')
  //     } else if(Auth?.dataLogin) {
  //         navigate('/')
  //     }
  // }, [Auth.dataLogin])
  // return (
  //   <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
  //     <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
  //       <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
  //         Sign in
  //       </h1>
  //       <form className="mt-6" onSubmit={handleSubmit}>
  //         <div className="mb-2">
  //           <label
  //             htmlFor="email"
  //             className="block text-sm font-semibold text-gray-800"
  //           >
  //             Email
  //           </label>
  //           <input
  //             value={formData.email}
  //             onChange={handleChange}
  //             type="email"
  //             className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
  //           />
  //         </div>
  //         <div className="mb-2">
  //           <label
  //             htmlFor="password"
  //             className="block text-sm font-semibold text-gray-800"
  //           >
  //             Password
  //           </label>
  //           <input
  //             value={formData.password}
  //             onChange={handleChange}
  //             type="password"
  //             className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
  //           />
  //         </div>
  //         <a
  //           href="#"
  //           className="text-xs text-purple-600 hover:underline"
  //         >
  //           Forget Password?
  //         </a>
  //         <div className="mt-6">
  //           <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
  //             Login
  //           </button>
  //         </div>
  //       </form>

  //       <p className="mt-8 text-xs font-light text-center text-gray-700">
  //         {" "}
  //         Don't have an account?{" "}
  //         <a
  //           onClick={() => navigate('/register')}
  //           href="#"
  //           className="font-medium text-purple-600 hover:underline"
  //         >
  //           Sign up
  //         </a>
  //       </p>
  //     </div>
  //   </div>
  // )
}

export default Login