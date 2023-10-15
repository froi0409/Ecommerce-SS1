import React, { useState } from 'react'
import { TextField, Container, IconButton, Box} from '@mui/material';
import { Delete, Save, Search } from '@mui/icons-material';

function CrudSupplier() {  

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
    //console.log(userData)

    //handleCreateUser(userData);    
  };

  const handleSearch = () => {
    console.log('Buscar')    
  };

  const handleDelete = () => {
    console.log('Eliminar')
  };

  return (
    <div>
      <Container sx={{padding:12}} >
        <h1>Insersion de Proveedor</h1>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',    
            backgroundColor: '#e3f2fd',   
            borderRadius: '8px', 
          }}
        >
          <TextField name="supplier_id" label="Identificador" value={userData.supplier_id} onChange={handleChange} margin="dense" />
          <TextField name="supplier_name" label="Nombre" value={userData.supplier_name} onChange={handleChange} margin="dense" />
          <TextField name="description" label="Descripcion" value={userData.description} onChange={handleChange} margin="dense"/>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <IconButton color='secondary' onClick={handleSearch}>
              <Search/>
              Buscar
            </IconButton>
            <IconButton color='secondary' onClick={handleSave}>
              <Save/>
              Guardar
            </IconButton>
            <IconButton color='Error' onClick={handleDelete}>
              <Delete/>
              Eliminar
            </IconButton>
          </Box>
        </Box>
        
      </Container>
        
    </div>
  )
}

export default CrudSupplier