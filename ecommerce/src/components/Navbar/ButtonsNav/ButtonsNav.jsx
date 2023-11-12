import React from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InventoryIcon from '@mui/icons-material/Inventory';
import { ShoppingCart } from '@mui/icons-material';
import { Badge } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../../context/AuthContext';

export default function ButtonsNav({ cantidadProductos }) {
  const { isAuthenticated, logout } = useAuth();

  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
      {isAuthenticated && <BottomNavigationAction
        label="Favoritos"
        value="favorites"
        icon={<FavoriteIcon />}
        component={Link}
        to="/favorites" // Ruta que quieres enlazar
      />}
      <BottomNavigationAction
        label="Productos"
        value="products"
        icon={<InventoryIcon />}
        component={Link}
        to="/products" // Ruta que quieres enlazar
      />
      {!isAuthenticated &&<BottomNavigationAction
        label="Login"
        value="login"
        icon={<LoginIcon />}
        component={Link}
        to="/login" // Ruta que quieres enlazar
      />}
      <BottomNavigationAction
        label="Chat"
        value="chat"
        icon={<ChatIcon />}
        component={Link}
        to="/chat" // Ruta que quieres enlazar
      />
      {isAuthenticated && 
      <BottomNavigationAction
        label="Logout"
        value="logout"
        icon={<LogoutIcon />}
        onClick={logout}
        component={Link}
        to="/login" // Ruta que quieres enlazar
        />
      }
      <BottomNavigationAction
        label="Cart"
        value="cart"
        icon={
          <Badge
            badgeContent={cantidadProductos}
            color='secondary'
          >
            <ShoppingCart />
          </Badge>}
        component={Link}
        to="/cart" // Ruta que quieres enlazar
      />
      {isAuthenticated && <BottomNavigationAction
        label="Cuenta"
        value="account"
        icon={<AccountCircleIcon />}
        component={Link}
        to="/account" // Ruta que quieres enlazar
      />}
    </BottomNavigation>
  );
}