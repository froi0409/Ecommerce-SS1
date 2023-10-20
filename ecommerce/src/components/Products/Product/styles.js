import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    margin: '0 1rem 0 1rem',
    padding: '0 0 0 0',
    background: theme.palette.background.card,
  },
  media: {
    padding: '1em 1em 0 1em',
    objectFit: 'fill',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardContent: {    
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonContent: {        
    width: '100%',
  },
  cardIconButton: {

    background: theme.palette.background.dark,
  }
}));

