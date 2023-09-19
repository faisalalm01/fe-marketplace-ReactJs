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
    <div className='py-20 flex 2xl:container mx-auto flex-wrap justify-center gap-5 md:gap-5 max-sm:gap-4'>
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
