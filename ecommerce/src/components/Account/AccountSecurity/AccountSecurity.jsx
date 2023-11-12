import { Save } from '@mui/icons-material';
import { Alert, AlertTitle, Box, Container, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useStyles } from './styles';
import { useAuth } from '../../../context/AuthContext';

const AccountSecurity = (props) => {
    const {userData } = useAuth();

    const [ dataUser, setDataUser] = useState({
        name: userData.name,
        password: 'userData.name',
      });

    const classes = useStyles();
    const handleSave = () => {

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataUser({ ...dataUser, [name]: value });
      };


    return (
        <div className={classes.content}>
            <Container sx={{ padding: 12 }} >
                <h1>Propiedades</h1>
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
                        backgroundColor: '#CFE2FF',
                        borderRadius: '8px',
                    }}
                >
                    <TextField name="username" label="username" value={userData.user} margin="dense" disabled/>
                    <TextField name="name" label="Nombre" value={dataUser.name} onChange={handleChange} margin="dense" />
                    <TextField name="password" label="coloca tu nueva constraseña" type="password" value={dataUser.password} onChange={handleChange} margin="dense"/>
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

export default AccountSecurity;
