import React, { useState } from 'react'
import { TextField, Container, IconButton, Box, Alert, AlertTitle} from '@mui/material';
import { Save, Search } from '@mui/icons-material';
import UpdateIcon from '@mui/icons-material/Update';

const CrudCategory = (props) => {  
  const alert = props.alert;
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
    props.handleSave(process.env.REACT_APP_API_URL + '/api/createCategory',categoryData)
  };

  const handleUpdate = async () => {
    console.log('Update')    
    const updateData = {
      category_name: categoryData.category_name,
      filter: 'description',
      new_value: categoryData.description
    }
     await props.handleUpdate(process.env.REACT_APP_API_URL + '/api/updateCategory',updateData)
  };

  // const handleDelete = () => {
  //   console.log('Eliminar')
  //   const response = props.handleDelete(process.env.REACT_APP_API_URL + '/api/deleteUser?username',categoryData.category_name)
  //   if (response) {
  //     // Limpia los datos de usuario
  //     setCategoryData({
  //       category_name: '',
  //       description: '',
  //     });
  //   }
  // };

  return (
    <div>
      <Container sx={{padding:12}} >
        <h1>Insersion de Categoria</h1>
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
          <TextField name="category_name" label="Nombre" value={categoryData.category_name} onChange={handleChange} margin="dense" />
          <TextField name="description" label="Descripcion" value={categoryData.description} onChange={handleChange} margin="dense"/>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <IconButton color='secondary' onClick={handleUpdate}>
              <UpdateIcon/>
              Actualizar
            </IconButton>
            <IconButton color='secondary' onClick={handleSave}>
              <Save/>
              Guardar
            </IconButton>
          </Box>
        </Box>
        
      </Container>
        
    </div>
  )
}

export default CrudCategory