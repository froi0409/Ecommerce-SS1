import React, { useState } from 'react'
import { TextField, Container, IconButton, Box, Select, MenuItem, InputLabel, FormControl, Alert, AlertTitle } from '@mui/material';
import { Save } from '@mui/icons-material';
import axios from 'axios';

const CreateAccount = () => {
    const [alert, setAlert] = useState({ open: false, severity: 'success', title: '', message: '' });
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        first_name: '',
        last_name: '',
        birth_date: '',
        user_type: 'CLIENTE',
        payment_portal_account: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSave = () => {
        console.log('Guardar')
        save(process.env.REACT_APP_API_URL + '/api/createUser',
            userData)
    };

    const save = async (url, dataJson) => {
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
    }

    return (
        <div>

            <Container sx={{ padding: 12 }} >
                <h1>Nuevo Usuario</h1>

                {alert.open && <Alert
                    open={alert.open}
                    severity={alert.severity}
                    onClose={() => setAlert({ ...alert, open: false })}
                >
                    <AlertTitle>{alert.title}</AlertTitle>
                    {alert.message}
                </Alert>}

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#CFE2FF',
                        borderRadius: '8px',
                    }}
                >
                    <TextField name="username" label="Usuario" value={userData.username} onChange={handleChange} margin="dense" />
                    <TextField name="password" label="Contrasena" type="password" value={userData.password} onChange={handleChange} margin="dense" />
                    <TextField name="first_name" label="Nombre" value={userData.first_name} onChange={handleChange} margin="dense" />
                    <TextField name="last_name" label="Apellido" value={userData.last_name} onChange={handleChange} margin="dense" />
                    <TextField name="birth_date" label="Fecha Nacimiento" type="date" value={userData.birth_date} onChange={handleChange} InputLabelProps={{ shrink: true }} margin="dense" />
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <IconButton color='secondary' onClick={handleSave}>
                            <Save />
                            Guardar
                        </IconButton>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

export default CreateAccount;
