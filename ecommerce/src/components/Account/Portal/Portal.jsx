import React, { useState } from 'react';
import { Save } from '@mui/icons-material';
import { Alert, AlertTitle, Box, Container, IconButton, TextField } from '@mui/material';
import { useStyles } from './styles';
import { useAuth } from '../../../context/AuthContext';
import axios from 'axios';

const Portal = () => {

    const { userData } = useAuth();
    const [alert, setAlert] = useState({ open: false, severity: 'success', title: '', message: '' });

    const [dataUser, setDataUser] = useState({
        username: userData.user,
        payment_portal_account: '',
        payment_portal_password: '',
    });

    const classes = useStyles();
    const handleSave = () => {

    }

    const handleUpdatePasswd = async () => {
        console.log('Update passwd')
        await handleUpdate(process.env.REACT_APP_API_URL + '/api/addPaymentPortalAccount', dataUser)
    }

    const handleUpdate = async (url, dataUpdate) => {
        let isDelete = false;
        try {

            // Realiza la solicitud para eliminar en el servidor
            const response = await axios.post(`${url}`, dataUpdate);
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
            console.error('Error al insertar', error);
            // Si hubo un error al eliminar, muestra una alerta de error
            setAlert({
                open: true,
                severity: 'error',
                title: 'Error',
                message: 'Ocurrió un error al insertar',
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
                    <TextField name="payment_portal_account" label="Usuario del portal de pagos" value={dataUser.payment_portal_account} onChange={handleChange} margin="dense" />
                    <TextField name="payment_portal_password" label="Constraseña" type="password" value={dataUser.payment_portal_password} onChange={handleChange} margin="dense" inputProps={{ maxLength: 10 }}/>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <IconButton color='secondary' onClick={handleUpdatePasswd}>
                            <Save />
                            Guardar usuario de portal de pagos
                        </IconButton>
                    </Box>
                </Box>

            </Container>

        </div>
  )
}

export default Portal