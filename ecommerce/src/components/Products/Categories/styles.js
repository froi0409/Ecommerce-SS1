import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    categories_box: {
        backgroundColor: theme.palette.background.dark,
        height: "100%", 
    },
    categories_list: {
        listStyle: "none",
        margin: "3px 12px 0 3.2rem",
        // padding: "3px 0",
        height: "calc(100vh - 80px - 150px)",
        maxheight: "calc(100vh - 80px - 150px)",
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
        
    }
}));

