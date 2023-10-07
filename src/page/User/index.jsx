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
  const [orderItem, setOrderItem] = useState([]);
  const [simpul, setSimpul] = useState({})
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Setel header dengan token bearer
    const headers = {
      'access_token': `Bearer ${token}`,
    };
    axios.get(import.meta.env.VITE_BASE_URL + '/user/order', { headers })
      .then((response) => {
        setOrderItem(response.data.data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data order:', error);
      });
  }, []);

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
    setIsEditing(true);
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
  const [tokenTransaction, setTokenTransaction] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null);


  const process = async (id) => {
    const order = orderItem.find((p) => p.id === id)
    setSelectedProduct(order);
    const data = {
      name: user.username,
      order_id: order.id,
      total: order.totalPrice
    }
    const configg = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(import.meta.env.VITE_BASE_URL + '/user/transaction', data, configg)
    setTokenTransaction(response.data.token);
  }
  useEffect(() => {
    if (tokenTransaction) {
      window.snap.pay(tokenTransaction, {
        onSuccess: (result) => {
          localStorage.setItem('transaction', JSON.stringify(result))
          setTokenTransaction("")
        },
        onPending: (result) => {
          localStorage.setItem('transaction', JSON.stringify(result))
          setTokenTransaction("")
        },
        onError: (error) => {
          console.log(error);
          setTokenTransaction("")
        },
        onClose: () => {
          console.log('Anda Belum Menyelesaikan Pembayaran');
          setTokenTransaction("")
        }
      })
      // data.name(h  
    }
  }, [tokenTransaction])

  useEffect(() => {

    axios.get(import.meta.env.VITE_BASE_URL + 'simpulrempah/list')
      .then((response) => {
        setSimpul(response.data.data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data titik simpul:', error);
      });
  }, []);

  useEffect(() => {
    // production use : 'https://app.midtrans.com/snap/snap.js'
    const midtransUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'

    let scriptTag = document.createElement("script")
    scriptTag.src = midtransUrl

    const midtransClientKey = import.meta.env.CLIENT_KEY_MIDTRANS
    scriptTag.setAttribute("data-client-key", midtransClientKey)
    document.body.appendChild(scriptTag)
    return () => {
      document.body.removeChild(scriptTag)
    }
  })

  function Logout() {
    localStorage.removeItem('token');

    // Setelah menghapus token, Anda dapat melakukan tindakan lain yang sesuai
    // Misalnya, mengarahkan pengguna kembali ke halaman login atau beranda
    window.location.href = '/';
  }
  console.log(user);
  return (
    <>
      {/* <div className='my-20 '>
        {user ? (
          <div className=''>
            <div className='flex flex-wrap mx-32 px-12 py-10 bg-white rounded-lg shadow-xl'>
              <div className='w-2/6 mt-10 '>
                <img className='ml-20 border border-gray-400 w-36 rounded-full h-36' src={ImageProfileDefault} alt="user-profile" />
              </div>
              <div className='w-3/5 px-2'>
                {isEditing ? (
                  <>
                    <h2 className='font-semibold text-2xl py-2 border-b-2'>Edit Profil</h2>
                    <div className='flex flex-col'>
                      <input
                        type="text"
                        name="firstname"
                        placeholder='firstname'
                        value={user.firstname}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="lastname"
                        placeholder='lastname'
                        value={user.lastname}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="nohp"
                        placeholder='No.Telp'
                        value={user.nohp}
                        onChange={handleInputChange}
                      />
                      <textarea
                        name="address"
                        placeholder='address'
                        value={user.address}
                        onChange={handleInputChange}
                      />
                      <button onClick={handleSaveClick} className='bg-green-500 px-5 py-2 rounded-lg my-5 font-semibold text-white'>Simpan</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='flex justify-between'>
                      <h2 className='font-semibold text-2xl py-2'>Profile Saya</h2>
                        {user.dataMarket.length !== 0 ? (
                          <button onClick={() => navigate('/admin/dashboard')}>halaman dashboard</button>
                        ) : (
                          <>
                            <button className='px-3 rounded-lg hover:bg-orange-600 hover:text-white my-2' onClick={() => navigate('/admin/dashboard')}>registrasi toko</button>
                          </>
                        )}
                    </div>
                    <div className='border-t-2 py-5 font-medium text-lg'>
                      <p>Firstname: {user.firstname}</p>
                      <p>Lastname: {user.lastname}</p>
                      <p>Username: {user.username}</p>
                      <p>Email: {user.email}</p>
                      <p>Delivery Address: {user.address}</p>
                      <p>No.Telp: {user.nohp}</p>
                    </div>
                    <div className='flex flex-wrap gap-2'>
                      <button className='bg-blue-500 text-white font-serif px-6 py-2 rounded-lg' onClick={handleEditClick}>
                        Edit
                      </button>
                      <button className='bg-red-600 text-white font-serif px-4 py-2 rounded-lg' onClick={Logout}>
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className='mx-auto flex flex-wrap gap-5 justify-center my-5'>
              {orderItem.map((item) => (
                // <div key={item.id}>
                <div className='flex shadow-lg rounded-md w-2/5 pt-4 border' key={item.id}>
                  <div className='w-2/5 p-2'>
                    <img src={item?.product?.image} className='rounded-md' alt="" />
                  </div>
                  <div className='w-3/5 ml-4 px-1 space-y-2'>
                    <p className='text-2xl font-semibold'>{item?.product?.title}</p>
                    <div className='text-sm space-y-1'>
                      <p><b>Harga Product:</b> {item?.product?.price === null || item?.product?.price === 0 ? 'Free' : `${formatRupiah(`${item?.product?.price}`)},-`}</p>
                      <p>Total Product yang diambil: {item.totalProduct}</p>
                      <p>Total Harga: {item.totalPrice === null || item.totalPrice === 0 ? 'Free' : `${formatRupiah(`${item.totalPrice}`)},-`}</p>
                    </div>
                    <ButtonPrimary name={'Lanjut Bayar'} onClick={() => process(item.id)} classname={'p-2 my-4'} />
                  </div>
                </div>
              ))}

            </div>
          </div>
        ) : (
          <p>Tidak ada data pengguna.</p>
        )}
      </div> */}
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
                    onChange={handleInputChange}id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                  <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
               
                <div class="grid md:grid-cols-2 md:gap-6">
                  <div class="relative z-0 w-full mb-6 group">
                    <input 
                    type="text"
                    name="firstname"
                    placeholder='firstname'
                    value={user.firstname}
                    onChange={handleInputChange} id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                  </div>
                  <div class="relative z-0 w-full mb-6 group">
                    <input  type="text"
                        name="lastname"
                        placeholder='lastname'
                        value={user.lastname}
                        onChange={handleInputChange} id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                  </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                  <div class="relative z-0 w-full mb-6 group">
                    <input  
                    type='text'
                    name="nohp"
                    placeholder='nohp'
                    value={user.nohp}
                    onChange={handleInputChange} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (+62-xxx-xxx-xxx)</label>
                  </div>
                  <div class="relative z-0 w-full mb-6 group">
                    <input  name="address"
                    placeholder='address'
                    value={user.address}
                    onChange={handleInputChange} id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" />
                    <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
                  </div>
                </div>
                <button  onClick={handleSaveClick}  type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
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
                {user.dataMarket.length !== 0 ? (
                  <button className='px-3 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-700 hover:text-white my-2' onClick={() => navigate('/admin/dashboard')}>halaman dashboard</button>
                ) : (
                  <>
                    {user.simpulrempahId === null ? (
                      <button className='px-3 py-2 rounded-lg bg-orange-700 text-white hover:bg-orange-600 hover:text-white my-2' onClick={openModal}>registrasi toko</button>
                    ) : (
                      <button className='px-3 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-700 hover:text-white my-2' onClick={() => navigate('/admin/dashboard')}>halaman dashboard</button>
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
              <p>tambahkan tambahkan titik simpul terdekat dengan toko anda terlebih dahuli</p>
            </div>
            <hr />
            <h2 className="text-xl font-semibold my-2">Tambahkan Titik Simpul</h2>
            <div className="sm:col-span-3">
              <label for="country" className="block text-sm font-medium leading-6 text-gray-900">Pilih simpul rempah terdekat mu :</label>
              <div className="mt-2">
                <select
                  name="simpulrempahId"
                  value={user.simpulrempahId}
                  onChange={handleInputChange} className="block w-full rounded-md border-0 py-1.5 bg-white px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                  <option value="" disabled>Pilih Sipul Rempah</option>
                  {simpul && simpul.map((item) => (
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
