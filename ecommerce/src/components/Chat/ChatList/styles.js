import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: "#CFE2FF",
    height: "calc(100vh - 80px)", /* Resta el alto del toolbar */
  },
  root: {
    flexGrow: 1,
  },
  ul: {
    listStyle: "none",
    margin: "0 0 0 0",
    padding: "0 0 0 0",
    height: "calc(100vh - 80px - 60px)",
    overflowY: "auto",
    
    /* Estilos para la barra de desplazamiento */
    scrollbarWidth: "thin",
    scrollbarColor: "rgba(0, 0, 0, 0.2) transparent",
    
    /* Estilos específicos para WebKit (Chrome, Safari, etc.) */
    "&::-webkit-scrollbar": {
      width: "8px", /* Ancho de la barra de desplazamiento */
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0, 0, 0, 0.2)", /* Color de la barra de desplazamiento */
      borderRadius: "4px", /* Radio de borde de la barra de desplazamiento */
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent", /* Color de fondo del contenedor de la barra de desplazamiento */
    },
  },
}));
