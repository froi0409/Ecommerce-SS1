import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Products, Navbar, Login, Detail} from './components';
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
            <Route path="/detail" element={<Detail />} />
        </Routes>
        </ThemeProvider>
    </div>
  )
}

export default App