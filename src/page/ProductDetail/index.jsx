import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getDetailProduct } from '../../store/action';
import ButtonSecondary from '../../components/Button/Secondary';
import { formatRupiah } from '../../utils';
// import ButtonTest from '../../components/Button';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation()
    const { Product } = useSelector((state) => state)
    const [data, setData] = useState({})

    useEffect(() => {
        dispatch(getDetailProduct(id))
    }, [id])

    console.log(Product.dataDetailProduct);
    useEffect(() => {
        if (Product.dataDetailProduct) {
            setData(Product.dataDetailProduct)
        } else {
            setData({})
            // setKategori({})
        }
    }, [Product.dataDetailProduct])

    return (
        <div key={data.id}>
            <div className='w-full container mx-auto'>
                <div className='flex flex-wrap px-5 py-9 mx-32 bg-white mt-16 rounded-md shadow-xl gap-10'>

                    <div className='w-5/12'>
                        <img className='w-full rounded-md shadow-xl' src={data.image} alt={`gambar-product-${data.title}`} />
                    </div>
                    <div className='w-6/12'>
                        <div className='flex w-full'>
                            <h1 className='text-4xl font-semibold w-4/5'>{data.title}</h1>
                            <p className='w-1/5 mt-3'><i className='font-semibold'>Tersisa : </i>{data.stock}</p>
                        </div>
                        <div className='space-y-4 text-lg mt-5'>
                            <p><b>Kategori : </b>{data?.kategoris?.nama}</p>
                            <p className='flex font-semibold gap-2'>
                                Harga : 
                                <p className='text-red-600'>
                                    {data.price === null || data.price === 0 ? 'Free' : `${formatRupiah(`${data.price}`)},-`}
                                </p>
                            </p>
                            <div className='space-y-3'>
                                <b>Description :</b>
                                <p>{data.description}</p>
                            </div>
                        </div>
                        <button onClick={() => navigate('/')}>
                            back
                        </button>
                    </div>
                </div>

                <div className='flex flex-wrap mx-32 h-32 bg-white mt-16 rounded-md shadow-2xl'>
                    <div className='w-6/12 my-auto flex'>
                        <div className='border-r-2 border-gray-500 flex px-8'>
                            <div className='mr-8'>
                                <img className='rounded-full h-24 w-24' src={data.image} alt="" />
                            </div>
                            <div>
                                <p className='text-xl font-semibold my-2'>{data?.market?.nama}</p>
                                <ButtonSecondary
                                    name={"Kunjungi Toko"}
                                    classname={"text-purple-800 px-6 text-sm py-2 hover:text-white hover:bg-purple-800"}
                                    onClick={() => navigate('/')}
                                />
                            </div>
                        </div>
                        {/* <div className=''> */}
                        <div className='text-center mx-auto my-auto text-gray-500'>
                            <p>Total Product :</p>
                            <p className='text-xl font-serif'>{data.totalProduct}</p>
                        </div>
                    </div>
                    <div className='w-6/12 h-full ml-auto'>
                        <img className='w-full h-full' src={data.image} alt="" />
                    </div>
                    {/* </div> */}
                </div>

            </div>
        </div>
    )
}

export default ProductDetail