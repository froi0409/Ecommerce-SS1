import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import AccountItem from './AccountItem/AccountItem';
import { useStyles } from './styles';
import { useAuth } from '../../context/AuthContext';

const Account = () => {
    const classes = useStyles();
    const { userData } = useAuth();
    const isClient = userData.type === 'CLIENTE';
    const itemsCards = [
        { id: 1, name: 'Ordenes', description: 'Record de todas las compras realizadas', image: '/static/images/cards/orders.jpg', link: '/account/orders', client: true },
        { id: 2, name: 'Seguridad', description: 'Edita nombre, usuario, contrasena', image: '/static/images/cards/orders.jpg', link: '/account/security', client: true },
        { id: 3, name: 'Reportes', description: 'Muestra los respectivos reportes', image: '/static/images/cards/orders.jpg', link: '/account/reports', client: false },
        { id: 4, name: 'Ajustes', description: 'Agrega, elimina y modifica', image: '/static/images/cards/orders.jpg', link: '/account/crud-menu', client: false },
        { id: 5, name: 'Cuentas de Portal ', description: 'Administra todas tus Cuentas de Portal', image: '/static/images/cards/orders.jpg', link: '/account/portal', client: true },
    ]

    return (
        <div className={classes.content}>
            <Typography className={classes.title} gutterBottom variant="h4" component="div">
                Tu cuenta {userData.name}
            </Typography>
            <Box sx={{ flexGrow: 1, p: '1.2rem 0 0 1.4rem' }} >
                <Grid container spacing={2}>
                    {itemsCards
                        .filter((item) => !isClient || (isClient && item.client === true))
                        .map((item) => (
                            <Grid xs={12} sm={6} md={4} key={item.id}>
                                <AccountItem dataItem={item} />
                                <br />
                            </Grid>
                        ))}
                </Grid>
            </Box>
        </div>
    );
}

export default Account;
