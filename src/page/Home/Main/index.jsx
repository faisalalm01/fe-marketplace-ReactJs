import React, { useEffect, useState } from 'react'
import Banner from '../../../components/Banner'
import Product from '../Product';
import Market from '../Market/Market';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Main = () => {
  const [simpul, setSimpul] = useState([])
  useEffect(() => {

    // Setel header dengan token bearer
    // const headers = {
    //   'access_token': `Bearer ${token}`,
    // };

    // Buat permintaan GET ke endpoint keranjang
    axios.get(import.meta.env.VITE_BASE_URL + 'simpulrempah/list')
      .then((response) => {
        setSimpul(response.data?.data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data titik simpul:', error);
      });
  }, []);

  const navigate = useNavigate();
  console.log(simpul);
  return (
    <>
    <div className='mx-auto mt-16'>
      <header className='container mx-auto'>
        <Banner />
        {/* <div className='text-center mt-20'>
            <h1 className='text-3xl font-bold'>About Us</h1>
            <p className='mt-5 md:px-36 sm:px-4 lg:px-56 xl:px-56'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum nemo molestiae, tenetur eaque, quod sequi quisquam quidem perspiciatis enim dolore nisi repellendus vitae amet sapiente recusandae. Blanditiis nisi sint dignissimos?</p>
          </div> */}
      </header>
      <main className='mx-auto container pt-20'>

        <div className='mt-20 mb-5'>
          <p className='font-semibold text-2xl text-center'>Tentang JRM (Jejak Rempah Marketplace)</p>
          <div className='flex flex-col-reverse md:flex-row flex-wrap mx-auto py-9'>
            <div className='w-full lg:w-4/6 px-5 lg:px-20 text-gray-500 text-sm md:text-lg text-justify indent-8'>
              <p><b>JRM (Jejak Rempah Marketplace)</b> merupakan platform jual beli yang dapat digunakan UMKM di sekitar titik simpul jalur empah untuk memasarkan produknya. Jejak rempah sendiri tidak hanya melahirkan warisan-warisan berkaitan komoditas saja, tapi juga berkaitan dengan akulturasi budaya yang menciptakan kekhasan kerajinan tangan, kuliner, dan produk lainnya. Oleh karena itu, JRM ini memfasilitasi UMKM dan masyarakat umum dalam melakukan jual beli produk-produk barang yang berkaitan erat dengan titik-titik simpul jalur rempah.</p>
            </div>
            <div className='w-full p-5 lg:w-2/6'>
              <img className='rounded-2xl h-64 object-cover w-full' src="https://jejakrempah.com/static/img/landingpage/aboutimg.jpg" alt="" />
            </div>
          </div>
        </div>

        <p className='font-semibold text-2xl'>Titik Simpul Rempah</p>
        <hr className='border-1 rounded-xl my-4' />
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {simpul && simpul.map((item) => (
            <Link 
            key={item.id}
            to={`simpulrempah/detail/${item.id}`}
            // onClick={() => navigate(`/simpulrempah/detail/${item.id}`)}
             className="bg-white shadow-lg bg-inherit border-gray-300 rounded-md dark:border-gray-600 flex flex-wrap overflow-hidden hover:shadow-2xl">
              <div className='w-2/5' key={item.id}>
                <img src={item.logo} alt="" className='object-cover h-full' />
              </div>
              <div className='w-3/5 p-3'>
                <p className='text-sm font-bold mb-2'>{item.nama}</p>
                <p className='text-sm'>{item.alamat.slice(0, 60)}</p>
              </div>
            </Link>
          ))}

        </div>

        {/* <div className='mt-16'>
          <p className='font-semibold text-2xl'>Toko</p>
          <hr className='border-1 mx-44 rounded-xl mt-4' />
          <Market />
        </div> */}
        <div className='mt-16'>
          <p className=' font-semibold text-2xl'>Produk Terbaru</p>
          <hr className='border-1 mx-44 rounded-xl mt-4' />
          <Product />
        </div>
      </main>
    </div>
    </>
  )
}

export default Main