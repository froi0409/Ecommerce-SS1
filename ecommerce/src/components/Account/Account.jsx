import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import AccountItem from './AccountItem/AccountItem';
import { useStyles } from './styles';

const Account = () => {
    const classes = useStyles();
    const itemsCards = [
        { id: 1, name: 'Ordenes', description: 'Record de todas las compras realizadas', image: '/static/images/cards/orders.jpg', link: '/account/orders' },
        { id: 2, name: 'Seguridad', description: 'Edita nombre, usuario, contrasena', image: '/static/images/cards/orders.jpg',    link: '/account/orders' },
        { id: 3, name: 'Direcciones', description: 'Administra todas tus direcciones', image: '/static/images/cards/orders.jpg',   link: '/account/orders' },
        { id: 4, name: 'Ajustes', description: 'Agrega, elimina y modifica', image: '/static/images/cards/orders.jpg', link: '/account/crud-menu' },
    ]

    return (
        <div className={classes.content}>
            <Typography className={classes.title} gutterBottom variant="h4" component="div">
                Tu cuenta
            </Typography>
            <Box sx={{ flexGrow: 1, p: '1.2rem 0 0 1.4rem' }} >
                <Grid container spacing={2}>
                    {itemsCards.map((item) => (
                        <Grid xs={12} sm={6} md={4}>
                            <AccountItem key={item.id} dataItem={item} />
                            <br />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    );
}

export default Account;
