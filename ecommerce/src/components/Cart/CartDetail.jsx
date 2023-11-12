import React, { useState,useEffect }from 'react'
import { Box,Card,CardContent,CardMedia,Typography ,IconButton,Button} from '@mui/material'
import imagenPrueba1 from '../../assets/fotoPrueba1.jpg'
import { Add,Remove } from "@mui/icons-material";
import axios from 'axios';

const CartDetail = ({cart,removeFromCart,addToCart,productId}) => {
    
    const [producto, setProducto] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/api/getProduct/'+productId);
            setProducto(response.data);
          } catch (error) {
            console.error('Error al obtener datos de la API', error);
          }
        };
    
        fetchData();
      }, []);

    const stock = producto.stock;
  return (
    <div>
        <Card key={productId} sx={{ display: 'flex'}} >
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={`data:image/png;base64,${producto.images && producto.images[0] ? producto.images[0] : ''}`}
                alt="Producto"
              />
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography component="div" variant="h5">
                          {producto.product_name}
                      </Typography>
                      <Typography>
                        ID Producto: {productId}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" component="div">
                          {producto.description}
                      </Typography>
                  </CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', pl: 2, pb: 1 }}>
                    <Typography variant="h6" component="div">
                      Precio por Unidad: Q.{cart[productId].totalPrice}
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
                    <IconButton onClick={() => addToCart(productId,0)} disabled={cart[productId].quantity >= stock}>
                      <Add></Add>
                    </IconButton>    
                    <Typography variant="h6">
                      Subtotal: Q.{cart[productId].totalPrice * cart[productId].quantity}
                    </Typography>                           
                  </Box>
              </Box>
          </Card>
    </div>
  )
}

export default CartDetail