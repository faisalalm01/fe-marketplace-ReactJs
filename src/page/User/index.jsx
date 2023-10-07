import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { formatRupiah } from '../../utils';
import ButtonPrimary from '../../components/Button/Primary';
import { data } from 'autoprefixer';
import OrderCreate from '../../components/Order';
const ImageProfileDefault = '../src/assets/profile.jpg'

const UserProfile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('token');
  // const [orderItem, setOrderItem] = useState([]);
  const [simpul, setSimpul] = useState({})
  const [isModalOpen, setModalOpen] = useState(false);



  useEffect(() => {
    if (token) {
      // Jika token ada, lakukan permintaan ke API untuk mengambil detail pengguna
      const config = {
        headers: {
          'access_token': `Bearer ${token}`,
        },
      };

      axios.get(import.meta.env.VITE_BASE_URL + '/user/detail', config) // Ganti dengan URL API yang sesuai
        .then((response) => {
          setUser(response.data.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [token]);

  const openModal = () => {
    setModalOpen(true);
    // setIsEditing(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };


  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = () => {
    axios.put(import.meta.env.VITE_BASE_URL + '/user/update', user, {
      headers: {
        'access_token': `Bearer ${token}`,
      },
    })
      .then(() => {
        setIsEditing(false);
        setModalOpen(false)
      })
      .catch((error) => {
        console.error('Gagal menyimpan perubahan:', error);
        setIsEditing(false)
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // const [name, setName] = useState("")
  // const [order_id, setOrder_id] = useState(`209327323723`)
  // const [total, setTotal] = useState(1)


  useEffect(() => {

    axios.get(import.meta.env.VITE_BASE_URL + 'simpulrempah/list')
      .then((response) => {
        setSimpul(response.data.data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data titik simpul:', error);
      });
  }, []);


  function Logout() {
    localStorage.removeItem('token');

    // Setelah menghapus token, Anda dapat melakukan tindakan lain yang sesuai
    // Misalnya, mengarahkan pengguna kembali ke halaman login atau beranda
    window.location.href = '/';
  }
  console.log(user);
  return (
    <>
      {user ? (
        <div className="container px-32 lg:w-full mx-auto">

          {isEditing ? (
            <>
              <div className=" flex flex-col min-w-0 break-words bg-white text-black w-full mb-6 shadow-xl rounded-lg mt-16 p-9">
                <form>
                  <div class="relative z-0 w-full mb-6 group">
                    <input type="text"
                      name="username"
                      placeholder='username'
                      value={user.username}
                      onChange={handleInputChange} id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label htmlFor="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                  </div>

                  <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type="text"
                        name="firstname"
                        placeholder='firstname'
                        value={user.firstname}
                        onChange={handleInputChange} id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input type="text"
                        name="lastname"
                        placeholder='lastname'
                        value={user.lastname}
                        onChange={handleInputChange} id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div>
                  </div>
                  <div class="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                      <input
                        type='text'
                        name="nohp"
                        placeholder='nohp'
                        value={user.nohp}
                        onChange={handleInputChange} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (+62-xxx-xxx-xxx)</label>
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <input name="address"
                        placeholder='address'
                        value={user.address}
                        onChange={handleInputChange} id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                      <label htmlFor="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
                    </div>
                  </div>
                  <button onClick={handleSaveClick} type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full px-4 flex justify-center">
                      <div className="">
                        <img alt="asdasda" src={ImageProfileDefault} className="bg-red-500 shadow-xl rounded-full h-auto align-middle w-52 max-w-150-px" />
                      </div>
                    </div>
                    <div className='flex flex-wrap gap-2 mt-12'>
                      <button className='bg-blue-500 text-white font-serif px-6 py-2 rounded-lg' onClick={handleEditClick}>
                        Edit
                      </button>
                      <button className='bg-red-600 text-white font-serif px-4 py-2 rounded-lg' onClick={Logout}>
                        Logout
                      </button>
                    </div>
                  </div>
                  <div className="text-center mt-7">
                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                      {user.username}
                    </h3>
                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      {user.firstname}, {user.lastname}
                    </div>
                    <div className="mb-2 text-blueGray-600 mt-10">
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                      {user.email}
                    </div>
                    <div className="mb-2 text-blueGray-600">
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                      {user.nohp}
                    </div>
                    {/* <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  {user.simpulrempahId}
                </div> */}
                    {user.dataMarket.length !== 0 ? (
                      <>
                        <div className='bg-orange-700 text-white w-fit px-3 py-1 rounded-lg mx-auto'>Penjual</div>
                        <button className='px-3 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-700 hover:text-white my-2' onClick={() => navigate('/admin/dashboard')}>Sebagai Penjual</button>
                      </>
                    ) : (
                      <>
                        {user.simpulrempahId === null ? (
                          <div className='text-center'>
                            <div className='bg-green-500 text-white w-fit px-3 py-1 rounded-lg mx-auto'>Pembeli</div>
                            <button className='px-3 py-2 rounded-lg bg-orange-700 text-white hover:bg-orange-600 hover:text-white my-2' onClick={openModal}>registrasi Sebagai Penjual</button>
                          </div>
                        ) : (
                          <>
                            <div className='bg-orange-700 text-white w-fit px-3 py-1 rounded-lg mx-auto'>Penjual</div>
                            <button className='px-3 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-700 hover:text-white my-2' onClick={() => navigate('/admin/dashboard')}>Sebagai Penjual</button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                          {user.address}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <OrderCreate isOpen={isModalOpen} onClose={closeModal}>
                <div className='text-center text-red-600 font-semibold p-2 rounded-sm mb-2 text-sm bg-red-200'>
                  <p>tambahkan titik simpul terdekat dengan toko anda terlebih dahulu</p>
                </div>
                <hr />
                <h2 className="text-xl font-semibold my-2">Tambahkan Titik Simpul</h2>
                <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Pilih simpul rempah terdekat mu :</label>
                  <div className="mt-2">
                    <select
                      name="simpulrempahId"
                      value={user.simpulrempahId}
                      onChange={handleInputChange} className="block w-full rounded-md border-0 py-1.5 bg-white px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <option value="" disabled>Pilih Sipul Rempah</option>
                      {simpul && simpul?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nama}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleSaveClick} className='bg-green-500 px-5 py-2 rounded-lg my-5 font-semibold text-white'>Simpan</button>
                  </div>
                </div>
              </OrderCreate>
            </>
          )}
        </div>
      ) : (
        <div>
          Tidak ada pengguna
        </div>
      )}
    </>

  )
}

export default UserProfile
