import React,{useState,useEffect} from 'react'
import { TextField, Button, Box, Typography, InputLabel,MenuItem,Select,Alert, AlertTitle} from '@mui/material';
import { PersonAdd, Login, Add} from '@mui/icons-material'
import CheckoutCart from './CheckoutCart';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const Checkout = ({cart,getTotalQuantityInCart}) => {
    const [alert, setAlert] = useState({ open: false, severity: 'success', title: '', message: '' });
    const {userData } = useAuth();  
    const [newAddress, setNewAddress] = useState('');  

    const [selectedUserPayment, setSelectedUserPayment] = useState();
    const [paymentPortalAccount, setPaymentPortalAccount] = useState(['1','2','3']);

    const [paymentPortalPassword, setPaymentPortalPassword] = useState('');
    const getTotalPrice = () => {
        const productValues = Object.values(cart);
        const totalPrice = productValues.reduce(
          (total, product) => total + (product.totalPrice * product.quantity),
          0
        );
        return totalPrice; 
      }; 

    const [selectedOption, setSelectedOption] = useState('Nueva Direccion');
    const [addresses, setAddresses] = useState([]);

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);
    };

    const handleOptionChangeUserPayment = (event) => {
      setSelectedUserPayment(event.target.value);
    };

    const changeAlert = (data) => {
      setAlert(data)
    }

    const handleSearchAddress = async () => {
      console.log('Buscar Direcciones')    
      if(userData != null){
        const ruta = process.env.REACT_APP_API_URL + '/api/getAddressesByUsername/' + userData.user
        const response = await axios.get(ruta);
        if (response)
          setAddresses(response.data);
        }
    };

    const handleSearchUserPayments = async () => {
      console.log('Buscar Usuarios de portal de pagos')    
      if(userData != null){
        const ruta = process.env.REACT_APP_API_URL + '/api/getPaymentsUsersByUsername/' + userData.user
        const response = await axios.get(ruta);
        if (response)
          setPaymentPortalAccount(response.data);
        }
    };

    const handleSave = async (url, dataJson) => {
      let message = ''
      try {
        // Envía los datos al servidor
        const response = await axios.post(url, dataJson);
  
        // Procesa la respuesta del servidor
        // console.log('Respuesta del servidor:', response.data);
        message = response.data.message;
  
        // Configura la alerta de éxito
        setAlert({
          open: true,
          severity: 'success',
          title: 'Éxito',
          message: message,
        });
  
        // Cierra la alerta después de 3 segundos
        setTimeout(() => {
          setAlert({ ...alert, open: false });
        }, 3000);
      } catch (error) {
        console.error('Error al guardar', error);
  
        // Configura la alerta de error
        setAlert({
          open: true,
          severity: 'error',
          title: 'Error',
          message: error.message,
        });
  
        // Cierra la alerta después de 3 segundos
        setTimeout(() => {
          setAlert({ ...alert, open: false });
        }, 3000);
      }
    };


    const handleSavePayment = () => {
      //Haciendo el arreglo pa mandar      
      const cartArray = Object.entries(cart).map(([productId, cartItem]) => ({
        id: productId,
        quantity: cartItem.quantity,
      }));      

      const valNewPayment = {
        username: userData.user,
        products_detail: cartArray, 
        payment_portal_account: selectedUserPayment, 
        payment_portal_password: paymentPortalPassword, 
        address: selectedOption
      };
      //handleSave(process.env.REACT_APP_API_URL + '/api/makeSale', valNewAddress);
      console.log("Valores del pago");
      console.log(valNewPayment);
    };

    const handleSaveAddress = async () => {
      const valNewAddress = {
        username: userData.user,
        address: newAddress
      };
      try {
        await handleSave(process.env.REACT_APP_API_URL + '/api/addAddress', valNewAddress);
        await handleSearchAddress();
      } catch (error) {
        console.error('Error al guardar o buscar direcciones', error);
      }
    };

    const handleTextFieldChange = (event) => {      
      setNewAddress(event.target.value);
    };

    let usuario = '';
    if (userData != null){
      usuario = 'a';
    }

    useEffect(() => {
      const fetchData = async () => {
        try {     
          handleSearchAddress();
          //handleSearchUserPayments();
        } catch (error) {
          console.error('Error al obtener datos de la API', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>       
        <Box sx={{
            marginTop: 10,
            marginLeft: 3,
        }}>
            {alert.open && <Alert
            open={alert.open}
            severity={alert.severity}
            onClose={() => changeAlert({ ...alert, open: false })}
            >
              <AlertTitle>{alert.title}</AlertTitle>
              {alert.message}
            </Alert>}
            <Typography variant='h3'>
                Informacion del usuario
            </Typography>
            {usuario !== '' ? (
                <div>
                    <TextField sx={{marginRight:2}} id="username" label="Usuario" variant="filled" margin="dense" value={userData.user}/>
                    <TextField sx={{marginRight:2}} id="full_name" label="Nombre Completo" variant="filled" margin="dense" value={userData.name}/>
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
                      {addresses.map((item, index) => (
                        <MenuItem key={index} value={item.address}>
                          {item.address}
                        </MenuItem>
                      ))}
                    </Select>
                    {selectedOption === "Nueva Direccion" ? (
                        <div>
                            <TextField sx={{marginRight:2 , width:500}} id="newaddress" label="Nueva Direccion" variant="filled" margin="dense" onChange={handleTextFieldChange} value={newAddress}/>
                            <Button sx={{marginTop:1}} variant="contained" startIcon={<Add/>} onClick={handleSaveAddress}>Ingresar</Button>
                        </div>
                    ) : (
                        <div>                            
                        </div>
                    )}
                    <br/>
                    <br/>
                    <Typography variant='h5'> Informacion de la plataforma de pagos</Typography>
                    <InputLabel id="combo-box2-label">Selecciona usuario de Portal de Pagos</InputLabel>
                    <Select                      
                      id="payment_portal_account"
                      value={selectedUserPayment}
                      onChange={handleOptionChangeUserPayment}
                      label="Selecciona usuario de Portal de Pagos"
                      sx={{width:400}}
                    >                      
                      {paymentPortalAccount.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                    <br/>
                    <TextField sx={{marginRight:2}} id="payment_portal_password" label="Contrasena Portal de Pagos" variant="filled" margin="dense" value={paymentPortalPassword} onChange={(e) => setPaymentPortalPassword(e.target.value)} type="password"/>                    
                </div>
            ) : (
                <div>
                    <p>Parece que aun no has ingresado</p>
                    <Link to="/login" style={{ textDecoration: 'none' }} variant="contained">
                      <Button variant="contained" startIcon={<Login/>} >Ingresar</Button>
                    </Link>
                    <p>O no tienes una cuenta?</p>
                    <Link to="/new" style={{ textDecoration: 'none' }} variant="contained">
                      <Button variant="contained" startIcon={<PersonAdd/>} >Crear Cuenta</Button>
                    </Link>
                </div>
            )}
            

        </Box>
        <Box sx={{
            marginTop: 10,
        }}>
            <CheckoutCart cart={cart} getTotalPrice={getTotalPrice} getTotalQuantityInCart={getTotalQuantityInCart} handleSavePayment={handleSavePayment}/>
        </Box>
        
    </div>
  )
}

export default Checkout