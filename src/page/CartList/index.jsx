import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { formatRupiah } from '../../utils';
import ButtonPrimary from '../../components/Button/Primary';
import { useNavigate } from 'react-router-dom';

const CartList = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()

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
    <div className='container mx-auto mt-12 '>
      {cartItems.length === 0 ? (
        <>
        <div className='bg-white justify-center text-center rounded-md shadow-xl py-6 font-bold text-2xl'>
          <div>keranjangmu Kosong</div>
        </div>
        </>
      ) : (
        <>
            {cartItems && cartItems.map((item) => (
          <div  key={item.id}>
              <div className='mx-72 bg-white shadow-lg items-center rounded-md my-5 p-4 flex flex-wrap'>
                <div className='w-1/5'>
                  <img src={item?.products?.image} alt="gambar-product" className='w-52 rounded-md' />
                </div>
                <div className='ml-10 w-3/5'>
                  <p className='font-bold text-2xl mb-5 pb-2 border-b-2'>{item?.products?.title}</p>
                  <p><b>Harga : </b>{item?.products?.price === null || item?.products?.price === 0 ? 'Free' : `${formatRupiah(item?.products?.price)},-`}</p>
                  <p><b>Deskripsi : </b>{item?.products?.description.slice(0,140)} ...</p>
                  <ButtonPrimary name={'Detail Product'} classname={"p-2 my-2"} onClick={() => navigate(`/product/detail/${item?.products?.id}`)} />
                </div>
              </div>
          </div>
            ))}
        </>
      )}
    </div>
  )
}

export default CartList;