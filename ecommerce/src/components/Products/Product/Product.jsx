import React from 'react'
import { Card,CardMedia,CardContent,CardActions,Typography,IconButton,ButtonBase } from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

import { useStyles } from './styles'

function Product({producto,addToCart,getQuantityInCart}) {
  const classes = useStyles();
  const navigate = useNavigate();

  const idProduct = producto.product_id; // Define la variable que deseas pasar

  const handleButtonClick = () => {
    // Redirige al usuario a la nueva dirección y pasa la variable como parte de la URL    
    navigate('/detail', {
        state: {
            idProduct: idProduct,
        }
      });
  };
  const handleAddToCart = () => addToCart(producto.product_id,producto.unit_price);
  return (
    <Card className={classes.root} sx={{background: '#CFE2FF',}} >
    <CardMedia
        component="img"
        image={`data:image/png;base64,${producto.images[0]}`}
        title={producto.product_name}
        className={classes.media}
        height="300px"
      />
        <ButtonBase className={classes.buttonContent} onClick={handleButtonClick} >
        <CardContent className={classes.buttonContent}>
            <div className={classes.cardContent}>
                <Typography variant='h6' gutterBottom>
                {producto.product_name}
                </Typography>                                
            </div>
            <Typography variant='h6'>
                Q.{producto.unit_price}
            </Typography>
            <Typography variant="body2" sx={{p: '0 0 0.6em 0', height: '2em'}}>
                {producto.description.length > 60 // Cambia 100 al límite deseado
                ? producto.description.substring(0, 60) + "..." // Truncar y agregar "..."
                : producto.description}
            </Typography>
        </CardContent>
        </ButtonBase>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label='Add to Cart' onClick={handleAddToCart}  disabled={producto.stock <= getQuantityInCart(producto.product_id)}>
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>    
  )
}

export default Product