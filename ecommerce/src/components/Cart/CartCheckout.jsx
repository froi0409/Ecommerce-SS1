import { ShoppingCartCheckout } from '@mui/icons-material'
import { Box, Typography, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import React from 'react'

const CartCheckout = ({cart,getTotalPrice,getTotalQuantityInCart}) => {
    const [paymentMethod, setPaymentMethod] = React.useState('credit');

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  return (
    <Box sx={{width: 500,
        height: 350,
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
        <Typography variant='h6'> Usuario: </Typography>
        <Typography variant='h6'> Cantidad de Productos: {getTotalQuantityInCart()} </Typography>
        <Typography variant='h6'> Total: Q.{getTotalPrice()}</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>        
            <RadioGroup row aria-label="payment-method" name="payment-method" value={paymentMethod} onChange={handlePaymentChange}>
                <FormControlLabel value="credit" control={<Radio />} label="Crédito" />
                <FormControlLabel value="debit" control={<Radio />} label="Débito" />
            </RadioGroup>
        </Box>
        <br/>
        <Button variant="contained" startIcon={<ShoppingCartCheckout/>} >Checkout</Button>
    </Box>
  )
}

export default CartCheckout