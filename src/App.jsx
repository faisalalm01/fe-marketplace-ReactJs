import React, { useLayoutEffect } from 'react'
import { useLocation, Route, Routes } from 'react-router-dom'
import Main from './page/Home/Main';
import Register from './page/Register';
import Navbars from './components/Navbars';
import { ProductDetail } from './page';

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
        <Route path='/register' element={<Register/>} />
        <Route path='/product/:id' element={<ProductDetail/>} />
      </Routes>
    </div>
  )
}

export default App