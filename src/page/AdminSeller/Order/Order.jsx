import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar';
import axios from 'axios';
import { formatRupiah } from '../../../utils';

const Order = () => {
  const token = localStorage.getItem('token');
  const [order, setOrder] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [ product, setProduct] = useState(null)
  const [isKirim, setKirim] = useState({})

  const handleClickToAdd = () => {
    setIsAdd(true);
  };
  const handleButtonCancel = () => {
    setIsAdd(false);
  };


  useEffect(() => {

    // Setel header dengan token bearer
    const headers = {
      'access_token': `Bearer ${token}`,
    };

    // Buat permintaan GET ke endpoint keranjang
    axios.get(import.meta.env.VITE_BASE_URL + 'user/order/list', { headers })
      .then((response) => {
        setOrder(response.data.data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data market user:', error);
      });
  }, []);

  const hadnleUpdate = (id) => {
    const dataOrder = {
      status_kirim: 'Sudah Dikirim'
    }
    id
    const headers = {
      'access_token': `Bearer ${token}`,
    };

    // Buat permintaan GET ke endpoint keranjang
    axios.put(import.meta.env.VITE_BASE_URL + `user/order/${id}`, dataOrder,  { headers })
      .then((response) => {
        setKirim(response.data.data);
      })
      .catch((error) => {
        console.error('Gagal mengirim orderan', error);
      });
  };

  console.log(order);
  return (
    <>
      <Sidebar />
      <main class="p-4 md:ml-64 h-auto pt-20">
      <div>
      
            <>
              <section class="text-gray-600 body-font">
                <div class="container px-2 py-24 mx-auto">
              
                  <div class="lg:w-2/3 w-full mx-auto overflow-auto bg-white">
                    {order && order.length === 0 ? (
                      <div className='text-center font-bold text-2xl p-20 bg-white border rounded-lg shadow-xl '>
                        <div>Data Produk belum tersedia</div>
                      </div>
                    ) : (
                      <>
                        <table class="table-auto w-full text-left whitespace-no-wrap">
                          <thead>
                            <tr>
                              <th class="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">image</th>
                              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Nama Produk</th>
                              <th class="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Harga Produk</th>
                              <th class="px-1 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">total barang</th>
                              <th class="px-2 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Total Harga</th>
                              {/* <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">CreatedAt</th> */}
                              <th class="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">Status pembayaran</th>
                              <th class="px-1 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br">Status pengiriman</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order && order.map((item) => (
                            <>
                            <tr className='text-center' key={item.id}>
                              <td><img src={item?.product?.image} alt="" className='w-24 rounded-lg' /></td>
                              <td>{item?.product?.title}</td>
                              {/* <td>{item?.product?.description.slice(0,100)}</td> */}
                              <td>{item?.product?.price === null || item?.product?.price === 0 ? 'Free' : `${formatRupiah(`${item?.product?.price}`)},-`}</td>
                              <td>{item.totalProduct}</td>
                              <p>{item.totalPrice === null || item.totalPrice === 0 ? 'Free' : `${formatRupiah(`${item.totalPrice}`)},-`}</p>
                              {/* <td>{item.createdAt}</td> */}
                              {item.status_bayar === 'Belum Bayar' ? (
                                <td><p className='px-2 py-1 bg-red-300 text-red-700 text-xs rounded-lg'>{item.status_bayar}</p></td>
                                ): (
                                  <td><p className='px-2 py-1 bg-green-300 text-green-700 text-xs rounded-lg'>{item.status_bayar}</p></td>
                                )}
                                {item.status_bayar === 'Belum Bayar' ? (
                                  <>
                                  <td><button disabled className='px-1 py-1.5 bg-gray-300 text-gray-700 text-xs rounded-md'>Menunggu bayar</button></td>
                                  </>
                                  ):(
                                    <>
                                    {item.status_kirim === 'Belum Dikirim' ? (
                                      <td><button onClick={hadnleUpdate(item.id)} className='px-2 py-1.5 bg-gray-300 text-gray-700 text-xs rounded-md'>Kirim Order</button></td>
                                    ):(
                                      <td><button className='text-xs bg-green-300 text-green-700 px-2 py-1 rounded-md' disabled>{item.status_kirim}</button></td>
                                    )}
                                    </>
                                  )}

                            </tr>
                            </>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </div>
                  {/* <div class="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                    <button onClick={handleClickToAdd} class="flex ml-auto text-white bg-orange-700 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Add</button>
                  </div> */}
                </div>
              </section>
            </>
      </div>
      </main>
    </>
  );
}

export default Order