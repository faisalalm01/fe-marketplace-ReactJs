import React, { useState } from 'react'
import CardProduct from '../../../components/CardProduct/CardProduct'
import { getAllMarket } from '../../../store/action';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CardMarket from '../../../components/CardMarket/CardMarket';

const Market = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Market } = useSelector((state) => state);
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    getDataMarket();
  }, [])
  const getDataMarket = () => {
    dispatch(getAllMarket())
  }

  useEffect(() => {
    getDataMarket();
  }, []);

  useEffect(() => {
    if (Market.dataMarket.length >= 0) {
      setMarkets(Market.dataMarket)
    } else {
      setMarkets([]);
    }
  }, [Market.dataMarket]);
  return (
    <div className='flex flex-wrap gap-10 py-10'>
        {markets && markets.map((item) => (
        <CardMarket
            id={item.id}
            logo={item.logo}
            name={item.name}
            total={item.product.length}
            onClick={() => { navigate(`/market/detal/${item.id}`) }}
        />
        ))}
    </div>
  )
}

export default Market