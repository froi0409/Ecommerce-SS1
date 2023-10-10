import React from 'react'
import { Box,Card,CardContent,CardMedia,Typography ,IconButton,Button} from '@mui/material'
import imagenPrueba1 from '../../assets/fotoPrueba1.jpg'
import { Add,Remove } from "@mui/icons-material";
import { useStyles } from "./styles";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Cart = ({cart,removeFromCart,addToCart}) => {
    const classes = useStyles();    
    const handleAddToCart = (id) => addToCart(id,0);
    const isCartEmpty = Object.keys(cart).length === 0;    
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
          <Card key={productId} sx={{ display: 'flex'}} >
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={imagenPrueba1}
                alt="Producto"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                          Titulo de producto
                          ID Producto: {productId}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                          Dscripcion del producto
                      </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>
                    <Typography variant="h6" component="div">
                      Precio por Unidad: {cart[productId].totalPrice}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>   
                    <Typography variant="h6">
                      Cantidad
                    </Typography>
                    <IconButton onClick={() => removeFromCart(productId)}>
                      <Remove></Remove>
                    </IconButton>                    
                    <p>{cart[productId].quantity}</p>
                    <IconButton onClick={() => handleAddToCart(productId)}>
                      <Add></Add>
                    </IconButton>    
                    <Typography variant="h6">
                      Subtotal: {cart[productId].totalPrice * cart[productId].quantity}
                    </Typography>                           
                  </Box>
              </Box>
          </Card>
        ))}
        <Box sx={{pt:1}}>
          <Button variant="contained" startIcon={<ShoppingCartCheckoutIcon/>}>Checkout</Button>
        </Box> 
       </>
      )}
    </div>

  )
}

export default Cart