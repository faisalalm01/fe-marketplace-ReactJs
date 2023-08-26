import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'

const Navbars = () => {
  const navigate = useNavigate()
  return (
    <>
      <nav className='bg-white border-b-1 shadow-xl py-5 '>
        <div className='mx-auto container flex flex-wrap justify-between'>
          <div className='w-1/4' onClick={() => {navigate('/')}}>
            <img src="logo" alt="" className='w-40 h-10' />
          </div>
          <div className='mr-auto w-3/6'>
            <div className='text-center'>
              <form action="form">
                <input src='' placeholder='Cari Produk ...' className='bg-gray-200 text-sm text-black w-full px-10 my-2 rounded-md h-10 input' type="text" name="" id="" />
              </form>
            </div>
          </div>
          <div className='w-1/5 flex flex-row-reverse mt-4 text-lg font-semibold'>
            <Link className='ml-5' to={'/register'}>
              Register
            </Link>
            |
            <Link className='mr-5' to={'/login'}>
              Login
            </Link>
            {/* <img src="logo" alt="" className='w-40 h-10' />
            <img src="logo" alt="" className='ml-auto w-16 h-16 rounded-full border' /> */}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbars