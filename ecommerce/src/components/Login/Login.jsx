import React, { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material'
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import classes from './login.module.css'

import logo from '../../assets/LogoEcommerce.png'
import NewAccount from './NewAccount/NewAccount';
import axios from 'axios';
import API_URL from '../../config/paths';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const passwordChange = (e) => {
        const { value } = e.target;
        setPassword(value);
    }

    const usernameChange = (e) => {
        const { value } = e.target;
        setUsername(value);
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        // console.log(username,password);
        //enviar datos al backend
        await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, { username, password })
            .then((response) => {
                // Maneja la respuesta del servidor
                // Almacenar el token en localStorage
                if (response.data.token) {
                    console.log('token', response.data.token);
                    const token = response.data.token;
                    // localStorage.setItem('token', token);
                    login(token)
                    // Redirigir al usuario a /productos
                    navigate('/');
                    return;
                }
                console.log('no hay token')
            })
            .catch((error) => {
                // Maneja los errores
                console.log(error.message)
            });
    }
    return (
        <Fragment>
            <div className={classes.login}>
                <div className={classes.box_welcome}>
                    <Typography variant='h1'>
                        <p className={classes.welcome_write}>Bienvenido</p>
                    </Typography>
                </div>
                <div className={classes.logo}>
                    <Avatar alt="Logo ecommerce" src={logo} sx={{ width: 90, height: 90 }} />
                </div>
                <form onSubmit={loginHandler} >
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '43ch' },
                        }}
                        noValidate
                        autoComplete="on"

                    >
                        <TextField
                            id="standard-basic"
                            label="Escribe tu usuario"
                            variant="standard"
                            value={username}
                            onChange={usernameChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '43ch' },
                        }}
                        noValidate
                        autoComplete="on"
                    >
                        <TextField
                            id="standard-password-input"
                            label="Escribe tu contraseña"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            value={password}
                            onChange={passwordChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Button
                        sx={{
                            borderRadius: '0.625rem', background: '#9EC5FE',
                            color: 'black',
                            m: 1.5,
                            width: '51ch',
                        }}
                        variant="contained"
                        type='submit' >
                        Ingresar
                    </Button>
                </form>
            </div>
            <NewAccount />
        </Fragment>
    );
}

export default Login;
