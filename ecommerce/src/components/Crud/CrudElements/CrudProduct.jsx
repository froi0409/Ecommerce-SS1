import React, { useState } from 'react'
import { TextField, Container, IconButton, Box, Select, MenuItem, InputLabel, FormControl, Alert, AlertTitle, Button} from '@mui/material';
import { Delete, Save, Search,CloudUpload } from '@mui/icons-material';

const CrudProduct = (props) => {  
  const alert = props.alert;
  const [userData, setUserData] = useState({
    product_id: '',
    product_name: '',
    unit_price: '',
    stock: '',
    supplier_id: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    console.log('Guardar')
    props.handleSave('http://localhost:3001/api/insertProduct',
    userData)
  };

  const handleSearch = async () => {
    console.log('Buscar')
    const response = await props.handleSearch(
      'http://localhost:3001/api/searchProduct?product_name',
      userData.product_name)
    if (response) {
      setUserData(response)
    }
  };

  const handleDelete = () => {
    console.log('Eliminar')
    const response = props.handleDelete(
      'http://localhost:3001/api/deleteProduct?product_id',
      userData.username)
    if (response) {
      // Limpia los datos de usuario
      setUserData({
        product_id: '',
        product_name: '',
        unit_price: '',
        stock: '',
        supplier_id: '',
        description: '',
      });
    }
  };

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    // Actualiza la lista de archivos seleccionados
    setSelectedFiles(Array.from(e.target.files));
  };

  return (
    <div>
      <Container sx={{padding:12}} >
        <h1>Insersion de Producto</h1>
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
          <TextField name="product_id" label="id" value={userData.product_id} onChange={handleChange} margin="dense" />
          <TextField name="product_name" label="Nombre del producto" value={userData.product_name} onChange={handleChange} margin="dense"/>
          <TextField name="unit_price" label="precio unitario" value={userData.unit_price} onChange={handleChange} margin="dense"/>
          <TextField name="stock" label="stock" value={userData.stock} onChange={handleChange} margin="dense"/>
          <FormControl fullWidth margin="dense">
          <InputLabel>Proveedor</InputLabel>
            <Select
              name="supplier_id"
              value={userData.supplier_id}
              onChange={handleChange}
            >
              <MenuItem value="1"></MenuItem>
              <MenuItem value="2"></MenuItem>
            </Select>
          </FormControl>
          
          <TextField name="description" label="Descripcion" value={userData.description} onChange={handleChange} margin="dense" multiline maxRows={4}/>  
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUpload />}
          >
            {`Upload ${selectedFiles.length} file(s)`}
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </Button>
          {/* Puedes mostrar la lista de archivos seleccionados si lo deseas */}
          {selectedFiles.length > 0 && (
            <div>
              <p>Archivos seleccionados:</p>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

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

export default CrudProduct