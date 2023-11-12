import React,{useState} from 'react'
import { TextField, Container, Button, Box, Alert, AlertTitle, Typography, InputLabel,MenuItem,Select} from '@mui/material';
import { PersonAdd, Login, Add } from '@mui/icons-material'
import CheckoutCart from './CheckoutCart';

const Checkout = ({cart,removeFromCart,addToCart,getTotalQuantityInCart}) => {

    const getTotalPrice = () => {
        const productValues = Object.values(cart);
        const totalPrice = productValues.reduce(
          (total, product) => total + (product.totalPrice * product.quantity),
          0
        );
        return totalPrice;
      }; 
    const usuario = 'a';

    const [selectedOption, setSelectedOption] = useState('Nueva Direccion');

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>       
        <Box sx={{
            marginTop: 10,
            marginLeft: 3,
        }}>
            <Typography variant='h3'>
                Informacion del usuario
            </Typography>
            {usuario !== '' ? (
                <div>
                    <TextField sx={{marginRight:2}} id="username" label="Usuario" variant="filled" margin="dense"/>
                    <TextField sx={{marginRight:2}} id="first_name" label="Nombre" variant="filled" margin="dense"/>
                    <TextField id="last_name" label="Apellido" variant="filled" margin="dense"/>
                    <br/>
                    <br/>
                    <Typography variant='h5'> Direccion de Envio</Typography>
                    <InputLabel id="combo-box-label">Selecciona una Direccion</InputLabel>
                    <Select                      
                      id="address"
                      value={selectedOption}
                      onChange={handleOptionChange}
                      label="Selecciona una Direccion"
                      sx={{width:400}}
                    >
                      <MenuItem value="Nueva Direccion">Nueva Direccion</MenuItem>
                      <MenuItem value="address1">Direccion 1</MenuItem>
                      <MenuItem value="address1">Direccion 2</MenuItem>
                    </Select>
                    {selectedOption === "Nueva Direccion" ? (
                        <div>
                            <TextField sx={{marginRight:2 , width:500}} id="newaddress" label="Nueva Direccion" variant="filled" margin="dense"/>
                            <Button sx={{marginTop:1}} variant="contained" startIcon={<Add/>} >Ingresar</Button>
                        </div>
                    ) : (
                        <div>                            
                        </div>
                    )}
                    <br/>
                    <br/>
                    <Typography variant='h5'> Tipo de pago</Typography>
                    <InputLabel id="combo-box-label">Un tipo de pago</InputLabel>
                </div>
            ) : (
                <div>
                    <p>Parece que aun no has ingresado</p>
                    <Button variant="contained" startIcon={<Login/>} >Ingresar</Button>
                    <p>O no tienes una cuenta?</p>
                    <Button variant="contained" startIcon={<PersonAdd/>} >Crear Cuenta</Button>
                </div>
            )}
            

        </Box>
        <Box sx={{
            marginTop: 10,
        }}>
            <CheckoutCart cart={cart} getTotalPrice={getTotalPrice} getTotalQuantityInCart={getTotalQuantityInCart}/>
        </Box>
        
    </div>
  )
}

export default Checkout