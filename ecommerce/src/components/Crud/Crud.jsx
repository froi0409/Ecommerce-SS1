import React, { useState } from 'react'
import { Routes, Route  } from 'react-router-dom';
import CrudProducts from './CrudElements/CrudProduct'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CrudUsuario from './CrudElements/CrudUsuario';
import CrudSupplier from './CrudElements/CrudSupplier';
import CrudCategory from './CrudElements/CrudCategory';
import axios from 'axios';
import DeniedAuth from '../DeniedAuth/DeniedAuth';
import { useAuth } from '../../context/AuthContext';
const theme = createTheme();

const Crud = () => {
  // Verificar si el token está presente y no ha expirado
  const token = localStorage.getItem('token');
  const {userData} = useAuth()
  const isAdmin = userData.type === 'ADMINISTRADOR';
  const [alert, setAlert] = useState({ open: false, severity: 'success', title: '', message: '' });

  const changeAlert = (data) => {
    setAlert(data)
  }

  if (!token) {
    // Si no hay token, redirige al inicio de sesión, no he visto como hacer redirect
    return <DeniedAuth />
  }

  // Puedes agregar lógica para verificar la validez del token aquí

  // Si el token es válido, renderiza el componente protegido

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

  const handleSearch = async (url, dataSearch) => {
    let responses = null
    try {
      // Realiza la búsqueda por username en el servidor
      const response = await axios.get(`${url}/${dataSearch}`);

      // Si se encontró el usuario, rellena la información
      if (response.data) {
        const foundUser = response.data;
        console.log(foundUser[0])
        responses = foundUser[0]
        setAlert({
          open: true,
          severity: 'success',
          title: 'Éxito',
          message: 'encontrado con éxito',
        });
      } else {
        // Si no se encontró, muestra una alerta de error
        setAlert({
          open: true,
          severity: 'error',
          title: 'Error',
          message: 'no encontrado',
        });
      }
    } catch (error) {
      console.error('Error al buscar', error);
      setAlert({
        open: true,
        severity: 'error',
        title: 'Error',
        message: 'no encontrado',
      });
    } finally {
      // Cierra la alerta después de 3 segundos
      setTimeout(() => {
        setAlert({ ...alert, open: false });
      }, 3000);
      return responses;
    }
  };

  const handleDelete = async (url, dataDelete) => {
    let isDelete = false;
    try {

      // Realiza la solicitud para eliminar en el servidor
      // const response = await axios.delete(`${url}=${dataDelete}`);
      const response = await axios.delete(`${url}`, {data: dataDelete});

      if (response.data.message) {
        // Si se eliminó con éxito, muestra una alerta de éxito
        setAlert({
          open: true,
          severity: 'success',
          title: 'Éxito',
          message: response.data.message,
        });
        isDelete = true;
      } else {
        // Si hubo un error al eliminar, muestra una alerta de error
        setAlert({
          open: true,
          severity: 'error',
          title: 'Error',
          message: response.data.message_description,
        });
      }
    } catch (error) {
      console.error('Error al eliminar', error);
      // Si hubo un error al eliminar, muestra una alerta de error
      setAlert({
        open: true,
        severity: 'error',
        title: 'Error',
        message: 'Ocurrió un error al eliminar',
      });
    } finally {
      // Cierra la alerta después de 3 segundos
      setTimeout(() => {
        setAlert({ ...alert, open: false });
      }, 3000);
      return isDelete;
    }
  };


  const handleUpdate = async (url, dataUpdate) => {
    let isDelete = false;
    try {

      // Realiza la solicitud para eliminar en el servidor
      const response = await axios.put(`${url}`, dataUpdate);

      if (response.data.message) {
        // Si se actualizo con éxito, muestra una alerta de éxito
        setAlert({
          open: true,
          severity: 'success',
          title: 'Éxito',
          message: response.data.message,
        });
        isDelete = true;
      } else {
        // Si hubo un error al eliminar, muestra una alerta de error
        setAlert({
          open: true,
          severity: 'error',
          title: 'Error',
          message: 'Ocurrió un error al Actualizar',
        });
      }
    } catch (error) {
      console.error('Error al eliminar', error);
      // Si hubo un error al eliminar, muestra una alerta de error
      setAlert({
        open: true,
        severity: 'error',
        title: 'Error',
        message: 'Ocurrió un error al actualizar',
      });
    } finally {
      // Cierra la alerta después de 3 segundos
      setTimeout(() => {
        setAlert({ ...alert, open: false });
      }, 3000);
      return isDelete;
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        {isAdmin && <Routes>
          <Route path="/" element={<CrudProducts />} />
          <Route path="/crudproduct" element={<CrudProducts alert={alert} changeAlert={changeAlert} handleSave={handleSave} handleUpdate={handleUpdate} handleDelete={handleDelete} />} />
          <Route path="/crudusuario" element={<CrudUsuario alert={alert} changeAlert={changeAlert} handleSave={handleSave} handleSearch={handleSearch} handleDelete={handleDelete} />} />
          <Route path="/crudsupplier" element={<CrudSupplier alert={alert} changeAlert={changeAlert} handleSave={handleSave} handleUpdate={handleUpdate} handleDelete={handleDelete} />} />
          <Route path="/crudcategory" element={<CrudCategory alert={alert} changeAlert={changeAlert} handleSave={handleSave} handleUpdate={handleUpdate} />} />
        </Routes>}
      </ThemeProvider>
    </div>
  )
}

export default Crud