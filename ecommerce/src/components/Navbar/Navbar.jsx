import React from 'react';
//import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@mui/material';

import logo from '../../assets/LogoEcommerce.png' 
import {useStyles} from './styles';
import ButtonsNav from './ButtonsNav/ButtonsNav';

const cantidadProductos = 4;

const Navbar = ({prodQuantity}) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="Frikistuff" height="25px" className={classes.image} /> Frikistuff
          </Typography>
          <div className={classes.grow} />      
          <div className={classes.buttonnav}>
            <ButtonsNav cantidadProductos={prodQuantity}/>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;