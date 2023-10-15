import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CrudProducts from './CrudElements/CrudProduct'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CrudUsuario from './CrudElements/CrudUsuario';
import CrudSupplier from './CrudElements/CrudSupplier';
import CrudCategory from './CrudElements/CrudCategory';
const theme = createTheme();

const Crud = () => {
  return (
    <div>
        <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<CrudProducts/>} />
              <Route path="/crudproduct" element={<CrudProducts/>} />
              <Route path="/crudusuario" element={<CrudUsuario/>} />
              <Route path="/crudsupplier" element={<CrudSupplier/>} />
              <Route path="/crudcategory" element={<CrudCategory/>} />
            </Routes>
        </ThemeProvider>
    </div>
  )
}

export default Crud