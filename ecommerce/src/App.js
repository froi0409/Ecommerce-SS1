import React from 'react'
import { Routes, Route } from 'react-router-dom';
//import Products from './components/Products/Products';
import { Products, Navbar,Login} from './components';


const App = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </div>
  )
}

export default App