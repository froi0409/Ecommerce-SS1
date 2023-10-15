import React, { useState } from 'react'
import { TextField, Container, IconButton, Box} from '@mui/material';
import { Delete, Save, Search } from '@mui/icons-material';

function CrudCategory() {  

  const [categoryData, setCategoryData] = useState({
    category_name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSave = () => {
    console.log('Guardar')
    //console.log(categoryData)

    //handleCreateUser(categoryData);
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
        <h1>Insersion de Categoria</h1>
        <Box 
          sx={{
            display: 'flex',
            flexDirection: 'column',    
            backgroundColor: '#e3f2fd',   
            borderRadius: '8px', 
          }}
        >
          <TextField name="category_name" label="Nombre" value={categoryData.category_name} onChange={handleChange} margin="dense" />
          <TextField name="category_name" label="Descripcion" value={categoryData.category_name} onChange={handleChange} margin="dense"/>
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

export default CrudCategory