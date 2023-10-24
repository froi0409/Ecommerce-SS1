import React from 'react';
import { Typography, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const ordersData = [
  { id: 1, date: '2023-10-15', total: 100.50 },
  { id: 2, date: '2023-10-10', total: 75.25 },
  { id: 3, date: '2023-10-05', total: 120.00 },
  // Agrega más datos de órdenes según sea necesario
];

const Orders = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Mis Órdenes
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID de Orden</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordersData.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Orders;
