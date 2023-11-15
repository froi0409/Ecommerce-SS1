import React, { useEffect, useState } from 'react'
import { TextField, Container, IconButton, Box, Select, MenuItem, InputLabel, FormControl, Alert, AlertTitle, Button } from '@mui/material';
import { Delete, Save, CloudUpload,Add } from '@mui/icons-material';
import BlockIcon from '@mui/icons-material/Block';
import axios from 'axios';

const CrudProduct = (props) => {
  const alert = props.alert;
  const [suppliers, setSuppliers] = useState([]);
  
  const [categories, setCategories] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [tags, setTags] = useState('');

  

  const [userData, setUserData] = useState({
    product_id: '',
    product_name: '',
    unit_price: '',
    stock: '',
    supplier_name: '',
    description: '',    
    tags:''
  });

  const handleFileChange = (e) => {
    // Actualiza la lista de archivos seleccionados
    const archivos = Array.from(e.target.files);
    setSelectedFiles(archivos);
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/api/getAllSuppliers');
        setSuppliers(response.data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []); // El segundo argumento [] significa que este efecto se ejecutará solo una vez al montar el componente

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_URL + '/api/getAllCategories');
        setCategories(response.data);        
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchSuppliers();
  }, []); // El segundo argumento [] significa que este efecto se ejecutará solo una vez al montar el componente


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    console.log('Guardar')
    const formData = new FormData();

    Object.entries(userData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }
    }

    props.handleSave(process.env.REACT_APP_API_URL + '/api/insertProduct',
      formData)
  };

  //deshabilitar
  const handleUpdate = async () => {
    console.log('deshabilitar')
    const response = await props.handleUpdate(
      process.env.REACT_APP_API_URL + '/api/disableProductById',
      { product_id: userData.product_id })
    if (response) {
      setUserData(response)
    }
  };

  const handleDelete = () => {
    console.log('Eliminar')
    const response = props.handleDelete(
      process.env.REACT_APP_API_URL + '/api/removeProduct',
      { product_name: userData.product_name })
    if (response) {
      // Limpia los datos de usuario
      setUserData({
        product_id: '',
        product_name: '',
        unit_price: '',
        stock: '',
        supplier_name: '',
        description: '',
      });
    }
  };
  const handleChangeCategory = (e) => {
    // Actualiza la lista de archivos seleccionados
    const categoriaSeleccionada = e.target.value;
    setCategorySelected(categoriaSeleccionada);
  };


  const handleAddTag = (e) => {
    // Actualiza la lista de archivos seleccionados    
    if(categorySelected !== ''){
      let nuevosTags = '';
      if (tags !== ''){
        nuevosTags = tags +','+ categorySelected;
      }else{
        nuevosTags = 'Todos,' + categorySelected;
      }

      setTags(nuevosTags);
      setUserData({ ...userData, tags: nuevosTags });
    }
  };

  return (
    <div>
      <Container sx={{ padding: 12 }} >
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
          <TextField name="product_name" label="Nombre del producto" value={userData.product_name} onChange={handleChange} margin="dense" />
          <TextField name="unit_price" label="precio unitario" value={userData.unit_price} onChange={handleChange} margin="dense" />
          <TextField name="stock" label="stock" value={userData.stock} onChange={handleChange} margin="dense" />
          <FormControl fullWidth margin="dense">
            <InputLabel>Proveedor</InputLabel>
            <Select
              name="supplier_name"
              value={userData.supplier_name}
              onChange={handleChange}
            >
              {suppliers.map((supplier) => (
                <MenuItem key={supplier.supplier_id} value={supplier.supplier_name}>
                  {supplier.supplier_name}
                </MenuItem>
              ))}
            </Select>

          </FormControl>

          <FormControl fullWidth margin="dense">
            <InputLabel>Tags</InputLabel>
            <Select              
              value={categorySelected} 
              onChange={handleChangeCategory}
            >
              {categories.map((category) => (
                <MenuItem key={category.category_name} value={category.category_name}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select> 
            <Button variant="contained" startIcon={<Add />} onClick={handleAddTag}>
              Agregar Categoria
            </Button>                          
            <TextField name="tags" label="Tags" margin="dense" disabled value={tags}/>
          </FormControl>

          <TextField name="description" label="Descripcion" value={userData.description} onChange={handleChange} margin="dense" multiline maxRows={4} />
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

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton color='secondary' onClick={handleUpdate}>
              <BlockIcon />
              Deshabilitar
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

export default CrudProduct