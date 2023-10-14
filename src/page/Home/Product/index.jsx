import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../../store/action';
import { useNavigate } from 'react-router-dom';
import CardProduct from '../../../components/CardProduct/CardProduct';
import { formatRupiah } from '../../../utils';

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Product } = useSelector((state) => state);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getDataProduct();
  }, [])
  const getDataProduct = () => {
    dispatch(getAllProduct())
  }

  useEffect(() => {
    getDataProduct();
  }, []);

  useEffect(() => {
    if (Product.dataProduct.length >= 0) {
      setProducts(Product.dataProduct)
    } else {
      setProducts([]);
    }
  }, [Product.dataProduct]);

  // const handleButtonClick = () => {
  //   console.log('Button clicked', Product.dataProduct.map((e, i) => {
  //     return {}
  //   }));
  // };
  return (
    <div className='md:gap-5 mx-2 md:mx-44 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4 py-10'>
        {products && products.map((item) => (
          // <div key={item.id}>
          <CardProduct
            key={item.id}
            image={item.image}
            id={item.id}
            title={item.title}
            price= {item.price === null || item.price === 0 ? 'Free' : `${formatRupiah(item.price)},-`}
            description={item.description}
            onClick={() => { navigate(`/product/detail/${item.id}`) }}
          />
          // </div>
        ))}
      </div>
    // </section>
  )
}

export default Product
