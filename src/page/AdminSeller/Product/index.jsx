import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CardProduct from '../../../components/CardProduct/CardProduct';
import { formatRupiah } from '../../../utils';
import Sidebar from '../../../components/Sidebar';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    marketId: '',
    stock: '',
    kategori: '',
    image: null,
  });
  const token = localStorage.getItem('token');
  const [markets, setMarkets] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [product, setProduct] = useState(null)

  const handleClickToAdd = () => {
    setIsAdd(true);
  };
  const handleButtonCancel = () => {
    setIsAdd(false);
  };


  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setProductData({ ...productData, [name]: files[0] });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  console.log(productData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', productData.title);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('stock', productData.stock);
      formData.append('marketId', productData.marketId);
      formData.append('kategori', productData.kategori);
      formData.append('image', productData.image);

      // Kirim data ke server dengan menggunakan axios
      const response = await axios.post(import.meta.env.VITE_BASE_URL + 'product/create', formData, {
        headers: {
          'access_token': `Bearer ${token}`, // Menggunakan token bearer untuk otorisasi
          'Content-Type': 'multipart/form-data', // Pastikan header sesuai
        },
      });

      // Proses respons dari server jika diperlukan
      console.log('Response:', response.data);
      window.location.href = window.location.href;
      setIsAdd(false)
    } catch (error) {
      console.error('Error:', error);
    }
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

  console.log(product);

  return (
    <>
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
              <div className='container mx-auto p-20 '>
                <p className='mb-5 text-2xl font-bold'>Produk Ku</p>
                <hr className='border-2' />
              </div>
              <div className='flex flex-wrap gap-8 container mx-auto justify-center'>
                {product && product.dataProduct.map((item) => (
                  <>
                    <CardProduct
                      key={item.id}
                      image={item.image}
                      id={item.id}
                      title={item.title}
                      price={item.price === null || item.price === 0 ? 'Free' : `${formatRupiah(item.price)},-`}
                      description={item.description.slice(0, 80)}
                      onClick={() => { navigate(`/product/detail/${item.id}`) }}
                    />
                  </>
                ))}
                <div className='w-52 mt-6'>
                  <button onClick={handleClickToAdd} className='w-full bg-red-400 shadow-lg rounded-md text-center opacity-60 p-2 hover:opacity-90'>
                    <div className='text-white font-mono text-6xl'>
                      +
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
      </div>
    </>
  );
}

export default AddProduct