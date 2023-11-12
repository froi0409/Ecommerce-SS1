import React, { useState } from 'react'
import { TextField, Container, IconButton, Box, Alert, AlertTitle } from '@mui/material';
import { Delete, Save, Search, Create } from '@mui/icons-material';

const CrudSupplier = (props) => {
  const alert = props.alert;
  const [userData, setUserData] = useState({
    supplier_id: '',
    supplier_name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    console.log('Guardar')
    props.handleSave(process.env.REACT_APP_API_URL + '/api/insertSupplier',
      userData)
  };

  const handleSearch = async () => {
    console.log('Buscar')
    const response = await props.handleSearch(
      process.env.REACT_APP_API_URL + '/api/searchSupplier?supplier_name',
      userData.supplier_name)
    if (response) {
      setUserData(response)
    }
  };

  const handleDelete = () => {
    console.log('Eliminar')
    const response = props.handleDelete(
      process.env.REACT_APP_API_URL + '/api/deleteSupplier?supplier_id',
      userData.supplier_id)
    if (response) {
      // Limpia los datos de usuario
      setUserData({
        supplier_id: '',
        supplier_name: '',
        description: '',
      });
    }
  };

  return (
    <div>
      <Container sx={{ padding: 12 }} >
        <h1>Insersion de Proveedor</h1>
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
          
          <TextField name="supplier_name" label="Nombre" value={userData.supplier_name} onChange={handleChange} margin="dense" />
          <TextField name="description" label="Descripcion" value={userData.description} onChange={handleChange} margin="dense" />
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

export default CrudSupplier

/*
<TextField name="supplier_id" label="Identificador" value={userData.supplier_id} onChange={handleChange} margin="dense" />
*/