import React, { useLayoutEffect } from 'react'
import { useLocation, Route, Routes } from 'react-router-dom'
import { Main } from './page';
import {Register} from './page';
import Navbars from './components/Navbars';
import { ProductDetail } from './page';
import { NotFound } from './page';

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
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App