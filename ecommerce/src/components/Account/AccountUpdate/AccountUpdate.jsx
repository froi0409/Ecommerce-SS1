import React from 'react';
import { useStyles } from './style';
import { Alert, AlertTitle, Box, Container } from '@mui/material';

const AccountUpdate = () => {
    const classes = useStyles();

    // return (
    //     <div className={classes.content}>
    //         <Container sx={{ padding: 12 }} >
    //             <h1>Propiedades de la cuenta</h1>
    //             {alert.open && <Alert
    //                 open={alert.open}
    //                 severity={alert.severity}
    //                 onClose={() => setAlert({ ...alert, open: false })}
    //             >
    //                 <AlertTitle>{alert.title}</AlertTitle>
    //                 {alert.message}
    //             </Alert>}
    //             <Box
    //                 sx={{
    //                     display: 'flex',
    //                     flexDirection: 'column',
    //                     backgroundColor: '#CFE2FF',
    //                     borderRadius: '8px',
    //                 }}
    //             >
    //                 <TextField name="username" label="username" value={userData.user} margin="dense" disabled />
    //                 <TextField name="old_password" label="Contraseña actual" type="password" value={dataUser.old_password} onChange={handleChange} margin="dense" />
    //                 <TextField name="new_password" label="coloca tu nueva constraseña" type="password" value={dataUser.new_password} onChange={handleChange} margin="dense" />
    //                 <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
    //                     <IconButton color='secondary' onClick={handleUpdatePasswd}>
    //                         <Save />
    //                         Guardar nueva constraseña
    //                     </IconButton>
    //                 </Box>
    //             </Box>

    //         </Container>

    //     </div>
    // );
}

export default AccountUpdate;
