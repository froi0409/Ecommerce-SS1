import React from 'react'
import { Box,Card,CardContent,CardMedia,Typography ,IconButton,Button} from '@mui/material'
import { useStyles } from "./styles";
import { useNavigate } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CartDetail from './CartDetail';

const Cart = ({cart,removeFromCart,addToCart}) => {
    const classes = useStyles();    
    const navigate = useNavigate();    
    const isCartEmpty = Object.keys(cart).length === 0;  
    const stock = 4

    const getTotalPrice = () => {
      const productValues = Object.values(cart);
      const totalPrice = productValues.reduce(
        (total, product) => total + (product.totalPrice * product.quantity),
        0
      );
      return totalPrice;
    }; 

    const handleButtonClick = () => {
      // Redirige al usuario a la nueva dirección y pasa la variable como parte de la URL    
      navigate('/checkout');
    };
     
  return (
    <div className={classes.content}>     
      <Typography variant='h2'>
        Carrito de Compras
      </Typography>
      {isCartEmpty ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
        {Object.keys(cart).map((productId) => (
          <CartDetail cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} productId={productId}></CartDetail>
        ))}
        <Box sx={{pt:1, display:'flex'}}>
          <Button variant="contained" startIcon={<ShoppingCartCheckoutIcon/>} onClick={handleButtonClick}>Checkout</Button>
          <Typography variant='h6' sx={{paddingLeft:16}}>
            Total: Q.{getTotalPrice()}
          </Typography>
        </Box> 
       </>
      )}
    </div>

  )
}

export default Cart