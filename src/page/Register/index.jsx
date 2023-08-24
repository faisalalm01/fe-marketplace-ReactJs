import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../../store/action'
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname:'',
        email: '',
        password: '',
      });
    
      const handleChange = (prop) => (e) => {
        setFormData({
          ...formData,
          [prop]: e.target.value,
        });
      };
    
      const handleSubmit = async e => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:2024/api/auth/register', formData);
          console.log('Registration successful:', response.data);
        } catch (error) {
          console.error('Registration failed:', error);
        }
      };
    // const [data, setData] = useState({
    //     firstname: '',
    //     lastname: '',
    //     email: '',
    //     password: '',
    // })
    // const { Auth } = useSelector((state) => state)
    // const navigate = useNavigate();
    // const handleClickShowPassword = () => {
    //     setData({ ...data, showPassword: !data.showPassword })
    // }
    // console.log(Auth.dataRegister);
    // const handleChange = (prop) => (event) => {
    //     setData({ ...data, [prop]: event.target.value });
    // };
    // const dispatch = useDispatch();
    // const handleSubmit = () => {
    //     const dataSubmit = {
    //         firstname: data.firstname,
    //         lastName: data.lastname,
    //         email: data.email,
    //         password: data.password,
    //     };
    //     dispatch(registerUser(dataSubmit));
    // };
    // console.log(data);
    // useEffect(() => {
    //     if (Auth?.dataRegister === true) {
    //         navigate('/')
    //     } else {
    //         console.log('error register user');
    //     }
    // }, [Auth.dataRegister])

    return (
        // <div className='text-black'>
        //     <div className='flex py-8 mx-12 md:mx-0 md:py-0  flex-col mt-10 md:mt-0 items-center' >
        //         <div className='sm:mb-0 w-80 md:w-96 py-3'>
        //             <label className='leading-7 text-sm text-custom-text-primary'>Nama depan</label>
        //             <input
        //                 type='text'
        //                 id='nama-depan'
        //                 name='firstname'
        //                 placeholder='Masukan nama depan anda'
        //                 className='w-full bg-form-primary rounded-lg border border-gray-700 outline-2 outline-form-secondry text-background-primary text-lg normal-case py-1 px-3 leading-8'
        //                 onChange={handleChange('firstname')}
        //                 value={formData.firstname}
        //             />
        //         </div>
        //         <div className='sm:mb-0 w-80 md:w-96 py-3'>
        //             <label className='leading-7 text-sm text-custom-text-primary'>Nama belakang</label>
        //             <input
        //                 type='text'
        //                 id='nama-belakang'
        //                 name='lastname'
        //                 placeholder='Masukan nama belakang anda'
        //                 className='w-full bg-form-primary rounded-lg border border-gray-700 outline-2 outline-form-secondry text-background-primary text-lg normal-case py-1 px-3 leading-8'
        //                 onChange={handleChange('lastname')}
        //                 value={formData.lastname}
        //             />
        //         </div>
        //         <div className='sm:mb-0 w-80 md:w-96 py-3'>
        //             <label className='leading-7 text-sm text-custom-text-primary'>Email</label>
        //             <input
        //                 type='email'
        //                 id='email'
        //                 name='email'
        //                 placeholder='Masukan email anda'
        //                 className='w-full bg-form-primary rounded-lg border border-gray-700 outline-2 outline-form-secondry text-background-primary text-lg normal-case py-1 px-3 leading-8'
        //                 onChange={handleChange('email')}
        //                 value={formData.email}
        //             />
        //         </div>
        //         <div className='sm:mb-0 w-80 md:w-96 py-3'>
        //             <label className='leading-7 text-sm text-custom-text-primary'>Sandi</label>
        //             <div className='flex bg-form-primary rounded-lg text-background-primary text-lg normal-case py-1 px-3 leading-8'>
        //                 <input
        //                     // type={formData.showPassword ? 'text' : 'password'}
        //                     id='sandi'
        //                     name='password'
        //                     placeholder='Masukan sandi anda'
        //                     className='w-full bg-form-primary border-none text-background-primary text-lg normal-case py-1 px-3 leading-8 outline-form-secondry'
        //                     onChange={handleChange('password')}
        //                     value={formData.password}
        //                 />
        //                 {/* <button onClick={handleClickShowPassword}>
        //                     {data.showPassword ? <FiEye /> : <FiEyeOff />}
        //                 </button>
        //                 <div></div> */}
        //             </div>
        //             <p className='text-xs text-custom-text-primary text-center'>
        //                 Minimal 8 Karakter, Kombinasi huruf besar kecil dan anngka
        //             </p>
        //         </div>
        //         <button
        //             onClick={handleSubmit}
        //             className='w-80 md:w-96 text-custom-text-primary bg-background-secondary border-0 py-2 px-8 focus:outline-background-secondary rounded-lg text-lg mt-14'
        //         >
        //             Daftar
        //         </button>
        //     </div>
        // </div>
        <div className="text-black">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="firsname" placeholder="firstName" onChange={handleChange} />
        <input type="text" name="lastname" placeholder="lastname" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Register</button>
      </form>
    </div>
    )
}

export default Register