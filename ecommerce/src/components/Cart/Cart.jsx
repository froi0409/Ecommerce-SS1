import React from 'react'
import { Box,Card,CardContent,CardMedia,Typography ,IconButton,Button} from '@mui/material'
import { useStyles } from "./styles";
import { useNavigate } from 'react-router-dom';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import CartDetail from './CartDetail';
import CartCheckout from './CartCheckout';

const Cart = ({cart,removeFromCart,addToCart,getTotalQuantityInCart}) => {
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
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>       
          <Box sx={{width: 1000}}>
            {Object.keys(cart).map((productId) => (
              <CartDetail cart={cart} removeFromCart={removeFromCart} addToCart={addToCart} productId={productId}></CartDetail>
            ))}
            <Box sx={{pt:1, display:'flex'}}>
            
            <Typography variant='h6' sx={{paddingLeft:16}}>
              Total: Q.{getTotalPrice()}
            </Typography>
          </Box>
          </Box>
          <div>
            <CartCheckout cart={cart} getTotalPrice={getTotalPrice} getTotalQuantityInCart={getTotalQuantityInCart}/>
          </div>
       </div>
      )}
    </div>

  )
}
//<Button variant="contained" startIcon={<ShoppingCartCheckoutIcon/>} onClick={handleButtonClick}>Checkout</Button>

export default Cart