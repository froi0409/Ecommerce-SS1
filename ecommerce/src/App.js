import React from 'react'
//import Products from './components/Products/Products';

import { Products, Navbar} from './components';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();


const App = () => {
  return (
    <div>
        <ThemeProvider theme={theme}>
          <Navbar/>
          <Products/>
        </ThemeProvider>
        
    </div>
  )
}

export default App