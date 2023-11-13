import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from '../styles';
import AccountItem from '../AccountItem/AccountItem';

const  Reports = () => {
    const classes = useStyles();
    const itemsCards = [
        { id: 1, name: 'Todos los usuarios', description: 'Ver el reporte de todos los usuarios', image: '/static/images/cards/orders.jpg', link: '/account/reports/report-users' },
        { id: 2, name: 'Todos los empleados', description: 'Ver el reporte de todos los que trabajan', image: '/static/images/cards/orders.jpg', link: '/account/reports/report-employer' },
        { id: 3, name: 'Reporte general de ventas', description: 'Ver el reporte de todas las ventas', image: '/static/images/cards/orders.jpg', link: '/account/reports/report-sales' },
        { id: 4, name: 'productos vendidos por categoria', description: 'Ver el reporte de los productos por categoria', image: '/static/images/cards/orders.jpg', link: '/account/reports/report-products-category'},
        { id: 5, name: 'productos mayormente vendidos', description: 'reporte de Ventas mayores al promedio de ventas general', image: '/static/images/cards/orders.jpg', link: '/account/reports/report-productos-more-sales' },
        { id: 6, name: 'productos vendidos por proveedor', description: 'Ver el reporte de todos los productos que tengan el proveedor', image: '/static/images/cards/orders.jpg', link: '/account/reports/report-products-suppliers' },
        { id: 7, name: 'productos vendidos por nombre', description: 'Ver el reporte de todos los productos que tenga la palabra en su nombre y hayan sido vendidos', image: '/static/images/cards/orders.jpg', link: '/account/reports/report-products-name' },
        { id: 8, name: 'productos en un intervalo de tiempo', description: 'Ver el reporte de los productos en un intervalo de tiempo', image: '/static/images/cards/orders.jpg', link: '/account/reports/report-products-interval-time' },
        { id: 9, name: 'Reporte de ventas fallidas', description: 'Ver el reporte de todas las ventas a las que no se hayan completado la transaccion', image: '/static/images/cards/orders.jpg', link: '/account/reports/report-sale-fail' },
    ]
    
    return (
        <div className={classes.content}>
            <Typography className={classes.title} gutterBottom variant="h4" component="div">
                Reportes
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

export default  Reports;
