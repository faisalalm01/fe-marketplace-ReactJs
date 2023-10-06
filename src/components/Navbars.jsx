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
    return location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/admin/*';
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
        <nav class="bg-white border-b border-gray-200 px-4 py-5 fixed left-0 right-0 top-0 z-50 w-full shadow-lg">
          <div class="flex flex-wrap justify-between items-center container mx-auto">
            <div class="flex justify-start items-center">
              <button
                data-drawer-target="drawer-navigation"
                data-drawer-toggle="drawer-navigation"
                aria-controls="drawer-navigation"
                class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  class="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  aria-hidden="true"
                  class="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <a href="/" class="flex items-center justify-between mr-4">
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-black">Market Place</span>
              </a>
            </div>
            <div class="flex items-center lg:order-2">
              {token ? (
                <>
                  <button
                    type="button"
                    data-dropdown-toggle="notification-dropdown"
                    class="p-2 mr-1 text-gray-400 rounded-lg hover:text-white hover:bg-orange-700"
                  >
                    <span class="sr-only">View notifications</span>
                    <svg
                      aria-hidden="true"
                      class="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                      ></path>
                    </svg>
                  </button>

                  {cartItems && cartItems.length >= 0 ? (

                    <Link
                    to={'/user/carts'}
                      type="button"
                      data-dropdown-toggle="notification-dropdown"
                      class="p-2 mr-1 text-gray-400 rounded-lg hover:text-white hover:bg-orange-700 "
                    >
                      {cartItems.map((item) => (
                            <div key={item.id}>
                              <div className='font-thin text-center my-auto bg-red-600 w-2.5 h-2.5 text-white absolute rounded-full text-[11px]'>
                                <p className='text-black text-9xl'>{item.length}</p>
                              </div>
                            </div>
                          ))

                          }
                      <FaShoppingCart className='w-6 h-5' />
                    </Link>
                  ) : (
                    <></>
                  )}
                  <Link
                    to={'/user/profile'}
                    type="button"
                    class="justify-center gap-3 px-5 flex mx-3 text-sm bg-orange-700 text-white rounded-full md:mr-0 hover:bg-orange-600 py-2.5"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown"
                  >
                    <p className='my-auto font-bold text-lg'>Profile</p>
                    <img
                      class="w-8 h-8 rounded-full border-white border-2"
                      src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                      alt="user photo"
                    />
                  </Link>
                </>
              ) : (
                <>
                  <div className='w-full flex flex-row-reverse mt-4 text-lg font-normal'>
                    <Link className='ml-5 hover:bg-orange-700' to={'/register'}>
                      Register
                    </Link>
                    |
                    <Link className='mr-5' to={'/login'}>
                      Login
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </nav>
      )}

      {/* {shouldShowNavbar() && (

        <nav className='bg-white shadow-md py-3 w-full my-0 fixed top-0'>
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
              </div>
            )}
          </div>
        </nav>
      )} */}
    </>
  )
}

export default Navbars