import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getDetailMarket } from '../../store/action';
import CardProduct from '../../components/CardProduct/CardProduct';
import { formatRupiah } from '../../utils';

const MarketDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { Market } = useSelector((state) => state)
    const [data, setData] = useState({})

    useEffect(() => {
        dispatch(getDetailMarket(id))
    }, [id])

    console.log(Market.dataDetailMarket);
    useEffect(() => {
        if (Market.dataDetailMarket) {
            setData(Market.dataDetailMarket)
        } else {
            setData({})
        }
    }, [Market.dataDetailMarket])
    return ( 
        <>
            <div className='bg-white mt-16 mx-auto container rounded-lg shadow-xl'>
                <img src={data?.product?.[1].image} className='w-full h-52 object-cover' alt="" />
                <div className='flex flex-wrap py-6'>
                    <div className='w-3/12 border-r-2 border-gray-400 flex ml-10'>
                        <img className='rounded-full w-20 border border-gray-600 mr-7' src={data.logo} alt="" />
                        <div className='my-auto space-y-1'>
                            <h1 className='text-xl font-semibold'>{data.nama}</h1>
                            <p className='text-lg text-gray-500 font-serif'>Total Produk : {data?.product?.length}</p>
                        </div>
                    </div>
                    <div className='w-8/12 my-auto mx-auto pr-6'>
                        <p>{data.deskripsi}</p>
                    </div>
                </div>
            </div>

            <div className='text-center py-11'>
                <h1 className='text-2xl font-semibold'>Semua Product</h1>
            </div>

            <div className='flex mb-32 container mx-auto flex-wrap justify-center gap-5 md:gap-5 max-sm:gap-4'>
                {data?.product?.map((item, i) => (
                    <CardProduct
                        key={i}
                        image={item.image}
                        title={item.title}
                        description={item.description.slice(0,70)}
                        price= {item.price === null || item.price === 0 ? 'Free' : `${formatRupiah(item.price)},-`}
                        onClick={() => {navigate(`/product/${item.id}`)}}
                        />
                ))}
            </div>
        </>
    )
}

export default MarketDetail