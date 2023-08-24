import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../../../store/action';
import { useNavigate } from 'react-router-dom';
import CardProduct from '../../../components/CardProduct/CardProduct';

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

  const handleButtonClick = () => {
    console.log('Button clicked', Product.dataProduct.map((e, i) => {
      return {}
    }));
  };
  return (
    <div className='flex flex-wrap space-x-4 items-center justify-center'>
      {products && products.map((item) => (
        // <div key={item.id}>
        <CardProduct
          image={item.image}
          key={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
          onClick={() => {navigate(`/product/${item.id}`)}}
        />
        // </div>
      ))}
    </div>
  )
}

export default Product