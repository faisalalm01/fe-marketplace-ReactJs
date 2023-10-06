import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { formatRupiah } from '../../utils';
import ButtonPrimary from '../../components/Button/Primary';
import { data } from 'autoprefixer';
const ImageProfileDefault = '../src/assets/profile.jpg'

const UserProfile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('token');

  const [orderItem, setOrderItem] = useState([]);

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
  const [tokenTransaction,setTokenTransaction] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null);

  const process = async(id) => {
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
  },[tokenTransaction])

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

  return (
    <>
      <div className='container mx-auto my-20 '>
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
                    ):(
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
                      {/* <p>{item.id}</p> */}
                      <ButtonPrimary name={'Lanjut Bayar'} onClick={() => process(item.id)} classname={'p-2 my-4'} />
                    </div>
                  </div>
              // </div>
            ))}
            {/* {selectedProduct && (
              <>
                <p>{selectedProduct.id}</p>
                <p>{selectedProduct.totalPrice}</p>
                <p>{selectedProduct.totalProduct}</p>
              </>
            )} */}
            </div>
          </div>
        ) : (
          <p>Tidak ada data pengguna.</p>
        )}
      </div>
    </>

  )
}

export default UserProfile
