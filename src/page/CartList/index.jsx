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

  console.log(orderItem);
  return (
    <div className='mx-auto container'>
      {orderItem.length === 0 ? (
        <div className=' bg-white justify-center text-center rounded-lg shadow-xl py-6 font-bold text-2xl mt-16'>
          <div>keranjangmu Kosong</div>
        </div>
      ) : (
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-4 mx-auto container my-16">
          {orderItem && orderItem.map((item) => {
            <div
            key={item.id}
            class="rounded-lg bg-white shadow-md p-5"
            >
              <button onClick={process} className='p-3 bg-orange-700 hover:bg-orange-600 text-white'  >Bayar Sekarang</button>
          </div>
          })}
        </div>
      )}

    </div>
    // <div className='container mx-auto mt-12 '>
    //   {cartItems.length === 0 ? (
    //     <>
    //     <div className='bg-white justify-center text-center rounded-md shadow-xl py-6 font-bold text-2xl'>
    //       <div>keranjangmu Kosong</div>
    //     </div>
    //     </>
    //   ) : (
    //     <>
    //         {cartItems && cartItems.map((item) => (
    //       <div  key={item.id}>
    //           <div className='mx-72 bg-white shadow-lg items-center rounded-md my-5 p-4 flex flex-wrap'>
    //             <div className='w-1/5'>
    //               <img src={item?.products?.image} alt="gambar-product" className='w-52 rounded-md' />
    //             </div>
    //             <div className='ml-10 w-3/5'>
    //               <p className='font-bold text-2xl mb-5 pb-2 border-b-2'>{item?.products?.title}</p>
    //               <p><b>Harga : </b>{item?.products?.price === null || item?.products?.price === 0 ? 'Free' : `${formatRupiah(item?.products?.price)},-`}</p>
    //               <p><b>Deskripsi : </b>{item?.products?.description.slice(0,140)} ...</p>
    //               <ButtonPrimary name={'Detail Product'} classname={"p-2 my-2"} onClick={() => navigate(`/product/detail/${item?.products?.id}`)} />
    //             </div>
    //           </div>
    //       </div>
    //         ))}
    //     </>
    //   )}
    // </div>
  )
}

export default CartList;
