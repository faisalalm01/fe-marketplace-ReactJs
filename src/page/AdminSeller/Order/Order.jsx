import React, { useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar';
import axios from 'axios';

const Order = () => {
  const token = localStorage.getItem('token');
  const [markets, setMarkets] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [ product, setProduct] = useState(null)

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
    axios.get(import.meta.env.VITE_BASE_URL + 'user/market', { headers })
      .then((response) => {
        setMarkets(response.data.data.dataMarket);
      })
      .catch((error) => {
        console.error('Gagal mengambil data market user:', error);
      });
  }, []);

  useEffect(() => {

    // Setel header dengan token bearer
    const headers = {
      'access_token': `Bearer ${token}`,
    };

    // Buat permintaan GET ke endpoint keranjang
    axios.get(import.meta.env.VITE_BASE_URL + 'user/product', { headers })
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data product user:', error);
      });
  }, []);

  console.log(product?.dataProduct);

  return (
    <>
      <Sidebar />
      <main class="p-4 md:ml-64 h-auto pt-20">
      <div>
        {
          isAdd ? (
            <div className='mx-auto container'>
              <div className='bg-gray-200 mt-8 rounded-lg shadow-lg p-10'>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">Product</h2>
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                          <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Nama Produk</label>
                          <div className="mt-2">
                            <div className="px-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md bg-white">
                              <input
                                type="text"
                                name="title"
                                value={productData.title}
                                onChange={handleInputChange}
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="nama produk mu" />
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Jumlah Stok Produk</label>
                          <div className="mt-2">
                            <div className="px-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md bg-white">
                              <input
                                type="number"
                                name="stock"
                                value={productData.stock}
                                onChange={handleInputChange}
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="stok produk mu" />
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Harga Produk</label>
                          <div className="mt-2">
                            <div className="px-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md bg-white">
                              <input
                                type="number"
                                name="price"
                                value={productData.price}
                                onChange={handleInputChange}
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Harga produk mu" />
                            </div>
                          </div>
                        </div>

                        {/* <div className="sm:col-span-4">
                          <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Kategori produk</label>
                          <div className="mt-2">
                            <div className="px-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md bg-white">
                              <input
                                type="number"
                                name="kategori"
                                value={productData.kategori}
                                onChange={handleInputChange}
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Harga produk mu" />
                            </div>
                          </div>
                        </div> */}

                        <div className="sm:col-span-3">
                          <label for="country" className="block text-sm font-medium leading-6 text-gray-900">Pilih Toko produk</label>
                          <div className="mt-2">
                            <select
                              name="marketId"
                              value={productData.marketId}
                              onChange={handleInputChange} className="block w-full rounded-md border-0 py-1.5 bg-white px-3 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                              <option value="" disabled>Pilih Toko</option>
                              {markets && markets.map((market) => (
                                <option key={market.id} value={market.id}>
                                  {market.nama}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label for="about" className="block text-sm font-medium leading-6 text-gray-900">Deskripsi Produk</label>
                          <div className="mt-2">
                            <textarea
                              name="description"
                              value={productData.description}
                              onChange={handleInputChange} rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label for="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Gambar produk</label>
                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                              <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                              </svg>
                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                  <input
                                    type="file"
                                    name="image"
                                    onChange={handleInputChange}
                                  />
                                {/* <label for="file-upload" className="px-2 relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                  <span>Upload a file</span>
                                </label>
                                <input id="file-upload" type="file" name="image" onClick={handleInputChange} className="sr-only" /> */}
                                {/* <p className="pl-1">or drag and drop</p> */}
                              </div>
                              <p className="text-xs leading-5 text-gray-600">JPG</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={handleButtonCancel}>Cancel</button>
                    <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <>
              <section class="text-gray-600 body-font">
                <div class="container px-2 py-24 mx-auto">
              
                  <div class="lg:w-2/3 w-full mx-auto overflow-auto bg-white">
                    {product && product.dataProduct.length === 0 ? (
                      <div className='text-center font-bold text-2xl p-20 bg-white border rounded-lg shadow-xl '>
                        <div>Data Produk belum tersedia</div>
                      </div>
                    ) : (
                      <>
                        <table class="table-auto w-full text-left whitespace-no-wrap">
                          <thead>
                            <tr>
                              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">image</th>
                              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Nama Produk</th>
                              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Harga Produk</th>
                              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Stok</th>
                              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Deskripsi Produk</th>
                              <th class="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">CreatedAt</th>
                              <th class="w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {product && product.dataProduct.map((item) => (
                            <>
                            <tr className='text-center'>
                              <td><img src={item.image} alt="" className='w-20' /></td>
                              <td>{item.title}</td>
                              <td>{item.price}</td>
                              <td>{item.description}</td>
                              <td>{item.stock }</td>
                              <td>{item.createdAt}</td>
                            </tr>
                            </>
                            ))}
                          </tbody>
                        </table>
                      </>
                    )}
                  </div>
                  <div class="flex pl-4 mt-4 lg:w-2/3 w-full mx-auto">
                    <button onClick={handleClickToAdd} class="flex ml-auto text-white bg-orange-700 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Add</button>
                  </div>
                </div>
              </section>
            </>
          )}
      </div>
      </main>
    </>
  );
}

export default Order