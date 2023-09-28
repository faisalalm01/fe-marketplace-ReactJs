import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { formatRupiah } from '../../../utils';
import ButtonPrimary from '../../../components/Button/Primary';
import Sidebar from '../../../components/Sidebar';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [market, setMarket] = useState(null);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate()

  // const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('token');
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
  useEffect(() => {
    if (token) {
      // Jika token ada, lakukan permintaan ke API untuk mengambil detail pengguna
      const config = {
        headers: {
          'access_token': `Bearer ${token}`,
        },
      };

      axios.get(import.meta.env.VITE_BASE_URL + '/user/market', config) // Ganti dengan URL API yang sesuai
        .then((response) => {
          setMarket(response.data.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      // Jika token ada, lakukan permintaan ke API untuk mengambil detail pengguna
      const config = {
        headers: {
          'access_token': `Bearer ${token}`,
        },
      };

      axios.get(import.meta.env.VITE_BASE_URL + '/user/product', config) // Ganti dengan URL API yang sesuai
        .then((response) => {
          setProduct(response.data.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [token]);

  const username = user?.firstname;

  return (
    <div>
      <div className='mx-auto container my-20'>
        <div className='rounded-md border bg-white shadow-sm mx-28 p-2 px-20'>
          <p className='text-2xl font-semibold'>Welcome {username}</p>
        </div>
        <div className='flex flex-wrap gap-2 justify-center'>
          <div className='bg-white w-3/12 border rounded-lg my-4 shadow-lg p-3'>
            <p></p>
          </div>
          <div className='bg-white w-2/12 border rounded-lg my-4 shadow-lg p-3'>
            <p></p>
          </div>
          <div className='bg-white w-3/12 border rounded-lg my-4 shadow-lg p-3'>
            <p></p>
          </div>
          <div className='bg-white w-2/12 border rounded-lg my-4 shadow-lg p-3'>
            <p></p>
          </div>
        </div>
        <div className='flex flex-wrap gap-6 justify-center'>
          <div className='border bg-white w-5/12 p-2 shadow-md rounded-sm'>
            <div className=''>
              <div className='flex flex-wrap justify-between p-4'>
                <p className='text-xl font-bold'>Produk</p>
                <button className='border px-4 rounded-md bg-gray-200' onClick={() => navigate('/admin/product')}>View All</button>
              </div>
              <hr />
              <div className='mt-4'>
                {product && product.dataProduct.length === 0 ? (
                  <div className='text-center'>
                    data kosong
                  </div>
                ) : (
                  <>
                      <div className='bg-gray-100 p-2 m-1 rounded-md'>
                    {product && product.dataProduct.map((item) => (
                        <div className='flex bg-white rounded-lg p-2 w-full shadow-md my-2' key={item.id}>
                          <div className='border rounded-lg'>
                            <img src={item.image} className='w-32 h-full rounded-lg' alt="test" />
                          </div>
                          <div className='flex flex-wrap justify-between ml-5 w-full'>
                            <div className='w-8/12 border-r-2 my-auto'>
                              <p className='font-semibold text-lg'>{item.title}</p>
                              <p>{item?.kategori}</p>
                              <p className='text-red-500 font-mono'>{item.price === null || item.price === 0 ? 'Free' : `${formatRupiah(`${item.price}`)},-`}</p>
                              <p className='font-serif'><i>stock : {item.stock}</i></p>
                            </div>
                            <div className='w-4/12 my-2'>
                              <div>
                                <ButtonPrimary classname={'p-2 w-full'} name={'detail'} onClick={() => navigate(`/product/detail/${item.id}`)} />
                                <ButtonPrimary classname={'p-2 mt-2 w-full'} name={'delete'} onClick={() => navigate(`/product/detail/${item.id}`)} />
                              </div>
                            </div>
                          </div>
                        </div>
                    )).slice(0, 5)}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className='border w-5/12 p-5 shadow-md rounded-sm'>
            <div className='flex flex-wrap justify-between mb-4'>
              <p className='text-xl font-bold'>Market</p>
              <button className='px-4 rounded-md bg-gray-200' onClick={() => navigate('/admin/market')}>View All</button>
            </div>
            <hr />
            <div className='mt-4'>
              {market && market.dataMarket.length === 0 ? (
                <div className='text-center'>
                  data kosong
                </div>
              ) : (
                <>
                    <div className='bg-gray-100 p-2 m-1 rounded-md'>
                  {market && market.dataMarket.map((item) => (
                      <div className='flex bg-white rounded-lg p-2 w-full shadow-md my-2 py-0' key={item.id}>
                        <div className='p-2'>
                          <img src={item.logo} className='border w-14 h-14 rounded-full' alt="logo-market" />
                        </div>
                        <div className='flex flex-wrap justify-between ml-3 py-2'>
                          <div className=''>
                            <p className='font-semibold text-lg'>{item.nama}</p>
                            <p className='font-serif'>{item.address}</p>
                            {/* <p>{item.price}</p> */}
                          </div>
                        </div>
                      </div>
                  )).slice(0, 3)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard