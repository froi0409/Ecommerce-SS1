import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InventoryIcon from '@mui/icons-material/Inventory';

export default function ButtonsNav() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Favoritos"
        value="favorites"
        icon={<FavoriteIcon />}
        component={Link}
        to="/favorites" // Ruta que quieres enlazar
      />
      <BottomNavigationAction
        label="Productos"
        value="products"
        icon={<InventoryIcon />}
        component={Link}
        to="/products" // Ruta que quieres enlazar
      />
      <BottomNavigationAction
        label="Login"
        value="login"
        icon={<LoginIcon />}
        component={Link}
        to="/login" // Ruta que quieres enlazar
      />
    </BottomNavigation>
  );
}