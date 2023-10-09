import React from 'react'
import { Box,Card,CardContent,CardMedia,Typography } from '@mui/material'
import QuantityButton from './QuantityButton';
import imagenPrueba1 from '../../assets/fotoPrueba1.jpg'
import { Add,Remove } from "@mui/icons-material";
import { useStyles } from "./styles";

const Cart = ({cart,removeFromCart,addToCart}) => {
    const classes = useStyles();
    let prueba = 0
    const handleAddToCart = (id) => addToCart(id);
    const handleRemoveToCart = (id) => removeFromCart(id);
  return (
    <div className={classes.content}>        
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
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>    
                    Cantidad                  
                      <button onClick={() => removeFromCart(productId)} disabled={cart[productId]===0}>
                        <Remove></Remove>
                      </button>
                      <p>{cart[productId]}</p>
                      <button onClick={() => addToCart(productId)} disabled={cart[productId] === 100}>
                        <Add></Add>
                      </button>                    
                  </Box>
              </Box>
          </Card>
        ))}
    </div>

  )
}

export default Cart