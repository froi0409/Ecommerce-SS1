import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';

import logo from '../../assets/LogoEcommerce.png' 
import {useStyles} from './styles';
import ButtonsNav from './ButtonsNav/ButtonsNav';

const Navbar = ({  }) => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="Frikistuff" height="25px" className={classes.image} /> Frikistuff
          </Typography>
          <div className={classes.grow} />          
          <div className={classes.button}>
            <IconButton to="/cart" aria-label="Show cart items" color="inherit">
              <Badge badgeContent={2} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>          
              <div className={classes.buttonnav}>
                <ButtonsNav />
              </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;