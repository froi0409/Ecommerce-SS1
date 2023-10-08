import React from 'react'
import { Card,CardMedia,CardContent,CardActions,Typography,IconButton,ButtonBase } from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

import { useStyles } from './styles'

function Product({producto,addToCart}) {
  const classes = useStyles();
  const navigate = useNavigate();

  const idProduct = producto.id; // Define la variable que deseas pasar

  const handleButtonClick = () => {
    // Redirige al usuario a la nueva dirección y pasa la variable como parte de la URL    
    navigate('/detail', {
        state: {
            idProduct: idProduct,
        }
      });
  };
  const handleAddToCart = () => addToCart(producto.id);
  return (
    <Card className={classes.root}>
        <CardMedia className={classes.media} image={producto.imagen} title={producto.nombre}></CardMedia>
        <ButtonBase className={classes.buttonContent} onClick={handleButtonClick} >
        <CardContent className={classes.buttonContent}>
            <div className={classes.cardContent}>
                <Typography variant='h5' gutterBottom>
                    {producto.nombre}
                </Typography>                
                <Typography variant='h5'>
                    Q.{producto.precio}
                </Typography>                
            </div>
            <Typography variant='body2' color='textSecondary'>
                {producto.descripcion}
            </Typography>
        </CardContent>
        </ButtonBase>
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label='Add to Cart' onClick={handleAddToCart}>
                <AddShoppingCart />
            </IconButton>
        </CardActions>
    </Card>    
  )
}

export default Product