import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  categorie_li: {
    // color: "#FFFFFF",
    paddingBottom: "0.7rem",
    marginBottom: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s", // Transición suave para el cambio de color
    "&:hover": {
      color: "#7B7B7B", // Cambia el color al pasar el cursor por encima
    },
  },
}));
