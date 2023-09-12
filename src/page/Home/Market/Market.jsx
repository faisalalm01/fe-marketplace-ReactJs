import React, { useEffect, useState } from 'react'
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

  console.log(Market.dataMarket);
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
            key={item.id}
            id={item.id}
            logo={item.logo}
            name={item.nama}
            total={item.product}
            onClick={() => { navigate(`/market/detail/${item.id}`) }}
        />
        ))}
    </div>
  )
}

export default Market