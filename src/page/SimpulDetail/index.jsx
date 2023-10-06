import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const SimpulDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState({})

    useEffect(() => {
        // Gunakan Axios untuk mengambil detail data dari server berdasarkan ID
        axios.get(import.meta.env.VITE_BASE_URL + `/simpulrempah/detail/${id}`)
          .then((response) => {
            setData(response.data.data);
          })
          .catch((error) => {
            setError(error);
          });
      }, [id]);

      console.log(data);
    
    return ( 
        <>
            <div className='bg-white mt-16 mx-auto container rounded-lg shadow-xl'>
                <img src={data.logo} className='w-full h-full object-cover' alt="" />
                <div className='flex flex-wrap py-6'>
                    <div className='pr-5 border-r-2 border-gray-400 flex ml-10'>
                        <img className='rounded-full w-20 h-20 border border-gray-600 mr-7' src={data.logo} alt="" />
                        <div className='my-auto space-y-1'>
                            <h1 className='text-xl font-semibold'>{data.nama}</h1>
                            <p className='text-lg text-gray-500 font-serif'>Total Produk : {data?.market?.length}</p>
                        </div>
                    </div>
                    <div className='w-8/12 my-auto mx-auto pr-6'>
                        <p>{data.alamat}</p>
                    </div>
                </div>
            </div>

            <div className='text-center py-11'>
                <h1 className='text-2xl font-semibold'>Semua Product</h1>
            </div>

            {/* <div className='flex mb-32 container mx-auto flex-wrap justify-center gap-5 md:gap-5 max-sm:gap-4'>
                {data?.product?.map((item, i) => (
                    <CardProduct
                        key={i}
                        image={item.image}
                        title={item.title}
                        description={item.description.slice(0,70)}
                        price= {item.price === null || item.price === 0 ? 'Free' : `${formatRupiah(item.price)},-`}
                        onClick={() => {navigate(`/product/detail/${item.id}`)}}
                        />
                ))}
            </div> */}
        </>
    )
}

export default SimpulDetail