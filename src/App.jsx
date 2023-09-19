/* eslint-disable no-unused-vars */
import React, { useEffect, useLayoutEffect } from 'react'
import { useLocation, Route, Routes, useNavigate } from 'react-router-dom'
import { AddMarket, AddProduct, CartList, Dashboard, Login, Main, MarketDetail, UserProfile } from './page';
import { Register } from './page';
import Navbars from './components/Navbars';
import { ProductDetail } from './page';
import { NotFound } from './page';
import { isUserAuthenticated } from './utils';
import TestPayment from './page/TesPayment';
// import Test from './components/Test';

const App = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div>
      <Navbars />
      <Routes>
          <Route exact path='/' element={<Main />} />
          <Route path='/product/detail/:id' element={<ProductDetail />} />
          <Route path='/market/detail/:id' element={<MarketDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/user/profile' element={<UserProfile />} />
          <Route path='/user/carts' element={<CartList />} />
          {/* // admin */}
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/create-product' element={<AddProduct />} />
          <Route path='/admin/create-markt' element={<AddMarket />} />
          {/* // not found */}
        <Route path='*' element={<NotFound />} />
        {/* {test payment} */}
         <Route path='/testpayment' element={<TestPayment />} />
      </Routes>
    </div>
  )
}

export default App
