/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { formatRupiah } from '../../utils';
import ButtonPrimary from '../../components/Button/Primary';
import { useNavigate } from 'react-router-dom';

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()
  const [orderItem, setOrderItem] = useState([]);
  const [tokenTransaction, setTokenTransaction] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(null);
  const token = localStorage.getItem('token');
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

  // useEffect(() => {

  //   // Setel header dengan token bearer
  //   const headers = {
  //     'access_token': `Bearer ${token}`,
  //   };

  //   // Buat permintaan GET ke endpoint keranjang
  //   axios.get(import.meta.env.VITE_BASE_URL + '/user/cart', { headers })
  //     .then((response) => {
  //       setCartItems(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error('Gagal mengambil data keranjang:', error);
  //     });
  // }, []);

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

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  console.log(orderItem.length);
  return (
    <div className='mx-auto container mt-20'>
      {/* <p>{orderItem.length}</p> */}
      {orderItem?.length === 2 ? (
        <div className=' bg-white justify-center text-center rounded-lg shadow-xl py-6 font-bold text-2xl'>
          <div>keranjangmu Kosong</div>
        </div>
      ) : (
        <>
          {orderItem && orderItem.map((item) => (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 mx-auto container my-16">
            <div
              key={item.id}
              className="rounded-lg bg-white shadow-xl p-5 h-20"
            >
              <button onClick={openModal}
                className='p-3 bg-orange-700 hover:bg-orange-600 text-white'>Bayar Sekarang</button>
            </div>
            </div>
            ))}
            </>
      )}
      {/* <OrderCreate isOpen={isModalOpen} onClose={closeModal}>
        <h2 className="text-xl font-semibold">Order Product</h2>
        <img src={data.image} alt="product" />
        <div>
          <div className='flex flex-wrap'>
            <p className='w-9/12 text-2xl font-bold py-2'>{data.title}</p>
            <p className='w-3/12 mt-3'><i className='font-semibold'>Tersisa : </i>{data.stock}</p>
          </div>
          <p>Harga : <b className='text-red-600'>{data.price === null || data.price === 0 ? 'Free' : `${formatRupiah(`${data.price}`)},-`}</b></p>
          <p className='py-2 font-normal'>{data.description}</p>
        </div>
        <form onSubmit={handleAddToOrder}>
          <label htmlFor="">Jumlah : </label>
          <input className='border border-gray-500 rounded-lg px-2 w-1/5 mx-a' type="number"
            value={orderData.totalProduct}
            onChange={(e) => setOrderData({ ...orderData, totalProduct: e.target.value })}
          />
          <div className='flex flex-wrap gap-5 justify-center'>
            <ButtonSecondary type='submit' name={'Bayar Nanti'} onClick={handleAddToOrder} classname={'w-2/5 mt-5 hover:bg-blue-800 hover:text-white font-semibold'} />
            <ButtonPrimary classname={'p-4 w-2/5 mt-5'} onClick={process} name={"Lanjut Pemabayaran"} type='submit'></ButtonPrimary>
          </div>
        </form>
      </OrderCreate> */}

    </div>

  )
}

export default CartList;
