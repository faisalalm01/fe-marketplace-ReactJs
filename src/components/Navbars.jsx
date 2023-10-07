import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaUser, FaShoppingCart } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi'
const ImageLogo = '../src/assets/logo.png'
import axios from 'axios';

const Navbars = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

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
    axios.get(import.meta.env.VITE_BASE_URL + '/user/order', { headers })
      .then((response) => {
        setCartItems(response.data.data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data order:', error);
      });
  }, []);
  function Logout() {
    localStorage.removeItem('token');

    window.location.href = '/';
  }
  return (
    <>
      {shouldShowNavbar() && (
        <nav className="bg-white border-b border-gray-200 px-4 py-5 fixed left-0 right-0 top-0 z-50 w-full shadow-lg">
          <div className="flex flex-wrap justify-between items-center container mx-auto">
            <div className="flex justify-start items-center">
              <button
                data-drawer-target="drawer-navigation"
                data-drawer-toggle="drawer-navigation"
                aria-controls="drawer-navigation"
                className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <a href="/" className="flex items-center justify-between mr-4">
                <img src={ImageLogo} alt="logo" className='w-10 mr-2' />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-orange-700">Market Place</span>
              </a>
            </div>
            <div className="flex items-center lg:order-2">
              {token ? (
                <>
                  <button
                    type="button"
                    data-dropdown-toggle="notification-dropdown"
                    className="p-2 mr-1 text-gray-400 rounded-lg hover:text-white hover:bg-orange-700"
                  >
                    <span className="sr-only">View notifications</span>
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6"
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
                      className="p-2 mr-1 text-gray-400 rounded-lg hover:text-white hover:bg-orange-700 "
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
                    // onClick={toggleDropdown}
                    // onTouchMove={toggleDropdown}
                    type="button"
                    className="justify-center gap-3 px-5 flex mx-3 text-sm bg-orange-700 text-white rounded-full md:mr-0 hover:bg-orange-600 py-2.5"
                    id="user-menu-button"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown"
                  >
                    <p className='my-auto font-bold text-lg'>Profile</p>
                    <img
                      className="w-8 h-8 rounded-full border-white border-2 bg-white"
                      // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                      // alt="user photo"
                    />
                  </Link>
                  <button
                    onClick={Logout}
                    type="button"
                    data-dropdown-toggle="notification-dropdown"
                    className="p-2.5 ml-2 bg-orange-700 text-white rounded-lg hover:text-white hover:bg-orange-600"
                  >
                    <BiLogOut className='w-6 h-6'/>
                  </button>
                
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

     
    </>
  )
}

export default Navbars