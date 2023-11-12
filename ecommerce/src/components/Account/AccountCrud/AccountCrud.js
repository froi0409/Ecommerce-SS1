import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from '../styles';
import AccountItem from '../AccountItem/AccountItem';

const AccountCrud = () => {
    const classes = useStyles();
    const itemsCards = [
        { id: 1, name: 'Categorias', description: 'Agrega, elimina y modifica categorias', image: '/static/images/cards/orders.jpg', link: '/crudcategory' },
        { id: 2, name: 'Usuarios', description: 'Agrega, elimina y modifica usuarios', image: '/static/images/cards/orders.jpg',    link: '/crudusuario' },
        { id: 3, name: 'Proveedores', description: 'Agrega, elimina y modifica proveedores', image: '/static/images/cards/orders.jpg',   link: '/crudsupplier' },
        { id: 4, name: 'Productos', description: 'Agrega, elimina y modifica productos', image: '/static/images/cards/orders.jpg', link: '/crudproduct' },
    ]
    
    return (
        <div className={classes.content}>
            <Typography className={classes.title} gutterBottom variant="h4" component="div">
                Modifica, Elimina y Agrega
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

export default AccountCrud;
