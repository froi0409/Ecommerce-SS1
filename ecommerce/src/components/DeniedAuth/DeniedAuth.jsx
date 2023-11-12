import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useStyles } from './styles';


const DeniedAuth = () => {
    const classes = useStyles();
    return (
        <div className={classes.content}>
            <Typography variant="h5" gutterBottom>
                Inicia sesión primero para ver esta página
            </Typography>
            <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Iniciar Sesión
                </Button>
            </Link>
        </div>
    );
}

export default DeniedAuth;
