// En un archivo llamado auth.js

const isAuthenticated = () => {
    // Verificar si el token está presente y no ha expirado
    const token = localStorage.getItem('token');
    if (!token) {
      // Si no hay token, retorna falso (no autenticado)
      return false;
    }
  
    // Puedes agregar lógica para verificar la validez del token aquí
  
    // Si el token es válido, retorna verdadero (autenticado)
    return true;
  };
  
  export default isAuthenticated;