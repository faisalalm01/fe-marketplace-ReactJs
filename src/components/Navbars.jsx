import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import axios from 'axios';

const Navbars = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()

  const location = useLocation();
  const shouldShowNavbar = () => {
    return location.pathname !== '/login' && location.pathname !== '/register';
  };

  const token = localStorage.getItem('token'); // Gantilah sesuai dengan cara Anda menyimpan token

  useEffect(() => {

    // Setel header dengan token bearer
    const headers = {
      'access_token': `Bearer ${token}`,
    };

    // Buat permintaan GET ke endpoint keranjang
    axios.get(import.meta.env.VITE_BASE_URL + '/user/cart', { headers })
      .then((response) => {
        setCartItems(response.data.data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data keranjang:', error);
      });
  }, []);
  return (
    <>
    {shouldShowNavbar() && (

      <nav className='bg-white border-b-1 shadow-xl py-5 '>
        <div className='mx-auto container flex flex-wrap justify-between'>
          <div className='w-1/4' onClick={() => { navigate('/') }}>
            <img src="logo" alt="" className='w-40 h-10' />
          </div>
          <div className='mr-auto w-3/6'>
            <div className='text-center'>
              <form action="form">
                <input src='' placeholder='Cari Produk ...' className='bg-gray-200 text-sm text-black w-full px-10 my-2 rounded-md h-10 input' type="text" name="" id="" />
              </form>
            </div>
          </div>
          {token ? (
            <>
              <div className='w-1/5 flex flex-row-reverse my-auto text-lg font-semibold gap-2'>
                <Link to={'/user/profile'} className='flex gap-2 p-2 rounded-md'>
                  <FaUser className='w-6 h-6' />
                  Profile
                </Link>
                <div className='w-1/5 my-auto'>
                  {cartItems && cartItems.length >= 0 ? (
                    <Link to={'/user/carts'}>
                      <>
                        {cartItems.map((item) => (
                          <div key={item.id}>
                            <div className='font-thin text-center my-auto pt-0.5 bg-red-600 w-5 h-5 text-xs text-white absolute rounded-full'>{cartItems.length}</div>
                          </div>
                        ))

                        }
                      </>
                      <FaShoppingCart className='w-8 h-8' />
                    </Link>
                  ) : (
                    <div>

                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
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
          )}
        </div>
      </nav>
    )}
    </>
  )
}

export default Navbars