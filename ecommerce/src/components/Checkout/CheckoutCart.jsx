import { Payments } from '@mui/icons-material'
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React from 'react'

const CartCheckout = ({cart,getTotalPrice,getTotalQuantityInCart}) => {
    const [paymentMethod, setPaymentMethod] = React.useState('credit');

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  return (
    <Box sx={{width: 500,
        height: 250,
        backgroundColor:'#e3f2fd',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',        
        padding: '20px',
        marginRight: 10,
        }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant='h3'> Pago</Typography>
        </Box>
        <br/>        
        <Typography variant='h6'> Cantidad de Productos: {getTotalQuantityInCart()} </Typography>
        <Typography variant='h6'> Total: Q.{getTotalPrice()}</Typography>        
        <br/>
        <Button variant="contained" startIcon={<Payments/>} >Pagar Todo</Button>
    </Box>
  )
}

export default CartCheckout