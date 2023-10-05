import React from 'react'
import { Routes, Route } from 'react-router-dom';
//import Products from './components/Products/Products';

import { Products, Navbar} from './components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();


const App = () => {
  return (
    <div>
        <ThemeProvider theme={theme}>
          <Navbar/>
            <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
        </Routes>
        </ThemeProvider>
    </div>
  )
}

export default App