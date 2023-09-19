import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi'
import axios from 'axios';

const Navbars = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const shouldShowNavbar = () => {
    return location.pathname !== '/login' && location.pathname !== '/register';
  };

  const ShowNavbarDashboard = () => {
    return location.pathname !== '/dasboard/*';
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
  function Logout() {
    localStorage.removeItem('token');
    
    window.location.href = '/';
  }
  return (
    <>
      {shouldShowNavbar() && (

        <nav className='bg-white shadow-md py-3 w-full my-0'>
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
                <div className='w-1/4 flex flex-row-reverse my-auto text-lg font-semibold gap-2'>
                  <div onMouseLeave={() => setOpen(false)} className="relative">
                    <button
                    onClick={() => navigate('/user/profile')}
                      onMouseOver={() => setOpen(true)}
                      className="flex items-center bg-orange-700 px-4 py-2 hover:bg-white border-orange-700 border-1 border text-white hover:text-black rounded-full"
                    >
                      <FaUser className='w-5 h-5' />
                      <span className="mx-1">Profile</span>
                    </button>
                    <ul
                      className={`bg-white absolute left-0 w-40 py-2 rounded-lg shadow-xl ${open ? "block" : "hidden"
                        }`}
                    >
                      <Link to={'/user/profile'} className='flex gap-2 p-2 rounded-md'>
                        <FaUser className='w-4 h-6' />
                        Profile
                      </Link>
                      <button onClick={Logout} className='flex gap-2 p-1 rounded-md'>
                        <BiLogOut className='w-5 h-6' />
                        Logout
                      </button>
                    </ul>
                  </div>
                  <div className='w-1/12 my-auto'>
                    {cartItems && cartItems.length >= 0 ? (
                      <Link to={'/user/carts'}>
                        <>
                          {cartItems.map((item) => (
                            <div key={item.id}>
                              <div className='font-thin text-center my-auto bg-red-600 w-3 h-3 text-white absolute rounded-full text-[11px]'>
                                <p className='text-black text-9xl'>{item.length}</p>
                              </div>
                            </div>
                          ))

                          }
                        </>
                        <FaShoppingCart className='w-6 h-5' />
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