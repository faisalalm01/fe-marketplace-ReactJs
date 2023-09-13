import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getDetailProduct } from '../../store/action';
import ButtonSecondary from '../../components/Button/Secondary';
import { formatRupiah } from '../../utils';
import ButtonPrimary from '../../components/Button/Primary';
import { FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
// import ButtonTest from '../../components/Button';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { Product } = useSelector((state) => state)
    const [data, setData] = useState({})
    const [cartItems, setCartItems] = useState([]);
    const [user, setUser] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        dispatch(getDetailProduct(id))
    }, [id])

    useEffect(() => {
        if (token) {
          // Jika token ada, lakukan permintaan ke API untuk mengambil detail pengguna
          const config = {
            headers: {
              'access_token': `Bearer ${token}`,
            },
          };
    
          axios.get(import.meta.env.VITE_BASE_URL+'/user/detail', config) // Ganti dengan URL API yang sesuai
            .then((response) => {
              setUser(response.data.data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        }
      }, [token]);

    useEffect(() => {
        if (Product.dataDetailProduct) {
            setData(Product.dataDetailProduct)
        } else {
            setData({})
            // setKategori({})
        }
    }, [Product.dataDetailProduct])
    
    
    const handleAddToCart = () => {
            
        const headers = {
          'access_token': `Bearer ${token}`,
        };

        const productData = {
            // userId: user.id,
            productId: Product.dataDetailProduct.id,
          };

        axios.post(import.meta.env.VITE_BASE_URL+'user/cart', productData, { headers })
          .then((response) => {
            if (response.status === 200) {
                setCartItems(response.data.data);
                window.location.href = window.location.href;
            } else if(response.status === 401 || user.id === null) {
                navigate('/login')
            } else {
                window.location.href = window.location.href;
            }
          })
          .catch((error) => {
            console.error('Gagal menambahkan produk ke keranjang:', error);
          });
      };

    return (
        <div>
            <div className='w-full container mx-auto'>
                <div className='px-5 py-9 mx-32 bg-white mt-16 rounded-md shadow-xl'>
                    {data.stock === null || data.stock === 0 ? (
                        <>
                            <div className='flex flex-wrap rounded-md w-full bg-red-600 text-white justify-center item-center text-center font-bold text-xl py-3 gap-3'>
                                <div className='my-auto'>
                                    <FiAlertCircle />
                                </div>
                                <p>
                                    produk tidak tersedia
                                </p>
                            </div>
                        </>
                    ) : (
                        <div>
                        </div>
                    )};
                    <div className='flex flex-wrap gap-10'>

                        <div className='w-5/12'>
                            <img className='w-full rounded-md shadow-xl' src={data.image} alt={`gambar-product-${data.title}`} />
                            <div className='mt-6 flex gap-2 w-full border'>
                                <ButtonSecondary
                                    disable={data.stock === null || data.stock === 0 ? true : false}
                                    name={"Masukkan Keranjang"}
                                    classname={"w-7/12 bg-purple-800 px-10 py-2 text-white font-semibold hover:text-purple-800 hover:bg-white"}
                                    onClick={handleAddToCart}
                                />
                                <ButtonPrimary
                                    disabled={data.stock === null || data.stock === 0 ? true : false}
                                    name={"Order"}
                                    classname={"px-10 py-2 w-5/12"}
                                    onClick={() => { navigate('/') }}
                                />
                            </div>
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
                        </div>
                    </div>
                </div>

                <div className='mb-28 flex flex-wrap mx-32 h-32 bg-white mt-16 rounded-md shadow-2xl'>
                    <div className='w-6/12 my-auto flex'>
                        <div className='border-r-2 border-gray-500 flex px-8'>
                            <div className='mr-8'>
                                <img className='border border-gray-300 rounded-full h-24 w-24' src={data?.market?.logo} alt="" />
                            </div>
                            <div>
                                <p className='text-xl font-semibold my-2'>{data?.market?.nama}</p>
                                <ButtonSecondary
                                    name={"Kunjungi Toko"}
                                    classname={"text-purple-800 px-6 text-sm py-2 hover:text-white hover:bg-purple-800"}
                                    onClick={() => navigate(`/market/detail/${data?.market?.id}`)}
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