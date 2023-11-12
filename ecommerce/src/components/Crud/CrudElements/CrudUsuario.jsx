import React, { useState } from 'react'
import { TextField, Container, IconButton, Box, Select, MenuItem, InputLabel, FormControl, Alert, AlertTitle } from '@mui/material';
import { Delete, Save, Search } from '@mui/icons-material';

const CrudUsuario = (props) => {
  const alert = props.alert;
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    user_type: '',
    payment_portal_account: '',
  });  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    console.log('Guardar')
    props.handleSave(process.env.REACT_APP_API_URL + '/api/createUser',
    userData)
  };

  const handleSearch = async () => {
    console.log('Buscar')    
    const response = await props.handleSearch(
      process.env.REACT_APP_API_URL + '/api/searchUser?username',
      userData.username)
    if (response) {
      setUserData(response)
    }
  };

  const handleDelete = () => {
    console.log('Eliminar')
    const response = props.handleDelete(
      process.env.REACT_APP_API_URL + '/api/deleteUser?username',
      userData.username)
    if (response) {
      // Limpia los datos de usuario
      setUserData({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        birth_date: '',
        user_type: '',
        payment_portal_account: '',
        payment_portal_password: '',
      });
    }
  };

  return (
    <div>

      <Container sx={{ padding: 12 }} >
        <h1>Insersion de Usuario</h1>

        {alert.open && <Alert
          open={alert.open}
          severity={alert.severity}
          onClose={() => props.changeAlert({ ...alert, open: false })}
        >
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert>}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
          }}
        >
          <TextField name="username" label="Usuario" value={userData.username} onChange={handleChange} margin="dense" />
          <TextField name="password" label="Contrasena" type="password" value={userData.password} onChange={handleChange} margin="dense" />
          <TextField name="first_name" label="Nombre" value={userData.first_name} onChange={handleChange} margin="dense" />
          <TextField name="last_name" label="Apellido" value={userData.last_name} onChange={handleChange} margin="dense" />
          <TextField name="birth_date" label="Fecha Nacimiento" type="date" value={userData.birth_date} onChange={handleChange} InputLabelProps={{ shrink: true }} margin="dense" />
          <FormControl fullWidth margin="dense">
            <InputLabel>Tipo de Usuario</InputLabel>
            <Select
              name="user_type"
              value={userData.user_type}
              onChange={handleChange}
            >
              <MenuItem value="CLIENTE">Usuario</MenuItem>
              <MenuItem value="EMPLEADO">Empleado</MenuItem>
              <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
            </Select>
          </FormControl>

          <TextField name="payment_portal_account" label="Cuenta Portal Pagos" value={userData.payment_portal_account} onChange={handleChange} margin="dense" />
          <TextField name="payment_portal_password" label="PIN Portal Pagos" value={userData.payment_portal_password} onChange={handleChange} margin="dense" />
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton color='secondary' onClick={handleSearch}>
              <Search />
              Buscar
            </IconButton>
            <IconButton color='secondary' onClick={handleSave}>
              <Save />
              Guardar
            </IconButton>
            <IconButton color='Error' onClick={handleDelete}>
              <Delete />
              Eliminar
            </IconButton>
          </Box>
        </Box>

      </Container>
    </div>
  )
}

export default CrudUsuario