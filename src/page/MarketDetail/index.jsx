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

    // console.log(Market.dataDetailMarket);
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
                {/* <img src={data?.product?.[0].image} className='w-full h-52 object-cover' alt="" /> */}
                <div className='flex flex-wrap py-6'>
                    <div className='md:w-3/12 md:border-r-2 border-gray-400 flex ml-10 pr-3'>
                        <img className='rounded-full w-20 h-20 border mr-7 object-cover' src={data.logo} alt="" />
                        <div className='my-auto space-y-1'>
                            <h1 className='text-xl font-semibold'>{data.nama}</h1>
                            <p className='text-lg text-gray-500 font-serif'>Total Produk : {data?.product?.length}</p>
                        </div>
                    </div>
                    <div className='md:w-8/12 md:my-auto mx-4 mt-6 md:mx-auto'>
                        <p>{data.deskripsi}</p>
                    </div>
                </div>
            </div>

            <div className='text-center py-11'>
                <h1 className='text-2xl font-semibold'>Semua Product</h1>
            </div>

            <div className='md:gap-5 mx-1 md:mx-auto grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4 py-10 md:container'>
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
            </div>
        </>
    )
}

export default MarketDetail