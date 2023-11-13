import { Save } from '@mui/icons-material';
import { Alert, AlertTitle, Box, Container, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useStyles } from './styles';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

const AccountSecurity = (props) => {
    const { userData } = useAuth();
    const [alert, setAlert] = useState({ open: false, severity: 'success', title: '', message: '' });

    const [dataUser, setDataUser] = useState({
        username: userData.user,
        old_password: '',
        new_password: '',
    });

    const classes = useStyles();
    const handleSave = () => {

    }

    const handleUpdatePasswd = async () => {
        console.log('Update passwd')
        await handleUpdate(process.env.REACT_APP_API_URL + '/api/updatePassword', dataUser)
    }

    const handleUpdate = async (url, dataUpdate) => {
        let isDelete = false;
        try {

            // Realiza la solicitud para eliminar en el servidor
            const response = await axios.put(`${url}`, dataUpdate);
            console.log(response);
            if (response.data.message && response.status === 200) {
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
                    message: response.data.message,
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataUser({ ...dataUser, [name]: value });
    };


    return (
        <div className={classes.content}>
            <Container sx={{ padding: 12 }} >
                <h1>Propiedades de la cuenta</h1>
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
                    <TextField name="username" label="username" value={userData.user} margin="dense" disabled />
                    <TextField name="old_password" label="Contraseña actual" type="password" value={dataUser.old_password} onChange={handleChange} margin="dense" />
                    <TextField name="new_password" label="coloca tu nueva constraseña" type="password" value={dataUser.new_password} onChange={handleChange} margin="dense" />
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <IconButton color='secondary' onClick={handleUpdatePasswd}>
                            <Save />
                            Guardar nueva constraseña
                        </IconButton>
                    </Box>
                </Box>

            </Container>

        </div>
    );
}

export default AccountSecurity;
