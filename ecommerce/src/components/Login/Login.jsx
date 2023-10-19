import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import {Typography } from '@mui/material'
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import classes from './login.module.css'

import logo from '../../assets/LogoEcommerce.png'
import NewAccount from './NewAccount/NewAccount';

const Login = () => {
    const loginHandler = (e) => {
        e.preventDefault();
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
                            m:1.5,
                            width: '51ch',
                        }}
                        variant="contained"
                        type='submit' >
                        Ingresar
                    </Button>
                </form>
                <Typography variant='body2'>
                    <p className={classes.forgot}><a className={classes.link} href="https://">Olvidaste la contraseña</a></p>
                </Typography>
            </div>
            <NewAccount />
        </Fragment>
    );
}

export default Login;
