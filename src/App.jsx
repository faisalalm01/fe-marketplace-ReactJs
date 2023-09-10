import React, { useLayoutEffect } from 'react'
import { useLocation, Route, Routes } from 'react-router-dom'
import { Login, Main, MarketDetail, UserProfile } from './page';
import { Register } from './page';
import Navbars from './components/Navbars';
import { ProductDetail } from './page';
import { NotFound } from './page';
// import Test from './components/Test';

const App = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <div>
    <Navbars/>
      <Routes>
        <Route exact path='/' element={<Main/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/product/:id' element={<ProductDetail/>} />
        <Route path='/market/:id' element={<MarketDetail/>} />
        <Route path='/user/profile' element={<UserProfile/>} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App