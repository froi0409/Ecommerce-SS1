import React from 'react'
import { Card,CardMedia,CardContent,CardActions,Typography,IconButton } from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'

import { useStyles } from './styles'

function Product({producto}) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
        <CardMedia className={classes.media} image={producto.imagen} title={producto.nombre}></CardMedia>
        <CardContent>
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
        <CardActions disableSpacing className={classes.cardActions}>
            <IconButton aria-label='Add to Cart'>
                <AddShoppingCart/>
            </IconButton>
        </CardActions>

    </Card>

  )
}

export default Product