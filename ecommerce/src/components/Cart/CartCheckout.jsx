import { ShoppingCartCheckout } from '@mui/icons-material'
import { Box, Typography, Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CartCheckout = ({cart,getTotalPrice,getTotalQuantityInCart}) => {
  const {userData } = useAuth()

  return (
    <Box sx={{width: 500,
        height: 300,
        backgroundColor:'#e3f2fd',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',        
        padding: '20px',
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h3'> Checkout</Typography>
        </Box>
        <br/>
        <Typography variant='h6'> {userData && userData.name ? `Usuario: ${userData.name}` : null} </Typography>
        <Typography variant='h6'> Cantidad de Productos: {getTotalQuantityInCart()} </Typography>
        <Typography variant='h6'> Total: Q.{getTotalPrice()}</Typography>
        <br/>
        <Link to="/checkout" style={{ textDecoration: 'none' }} variant="contained">
          <Button variant="contained" startIcon={<ShoppingCartCheckout />}>
            Checkout
          </Button>
        </Link>
    </Box>
  )
}

export default CartCheckout