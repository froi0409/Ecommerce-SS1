import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InventoryIcon from '@mui/icons-material/Inventory';
import { ShoppingCart } from '@mui/icons-material';
import { Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ButtonsNav({ cantidadProductos }) {
  const { isAuthenticated, logout, userData } = useAuth();
  const navigate = useNavigate();
  const [value, setValue] = React.useState('recents');
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    setOpenLogoutDialog(false);
    logout();
    navigate('/login');
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
  };

  return (
    <Fragment>
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
        onClick={handleLogoutClick}
        component={Link}
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
        label={userData.user}
        value="account"
        icon={<AccountCircleIcon />}
        component={Link}
        to="/account" // Ruta que quieres enlazar
      />}
    </BottomNavigation>
    <Dialog open={openLogoutDialog} onClose={handleLogoutCancel}>
        <DialogTitle>¿Estás seguro de que quieres cerrar sesión?</DialogTitle>
        <DialogContent>
           Regresaras a la pantalla de login
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleLogoutConfirm} color="primary" variant="contained">
            Cerrar Sesión
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}