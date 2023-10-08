import React from 'react'
import { Box,Card,CardContent,CardMedia,Typography } from '@mui/material'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

import imagenPrueba1 from '../../assets/fotoPrueba1.jpg'
import { useStyles } from "./styles";

const Cart = ({cart}) => {
    const classes = useStyles();
  return (
    <div className={classes.content}>        
        {Object.keys(cart).map((productId) => (
          /*<li key={productId}>
            Producto: {productId}, Cantidad: {cart[productId]}
          </li>*/
        <Card key={productId} sx={{ display: 'flex'}} >
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={imagenPrueba1}
              alt="Live from space album cover"
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
                    asdfasf
                </Box>
            </Box>
      
        </Card>
        ))}
    </div>

  )
}

export default Cart