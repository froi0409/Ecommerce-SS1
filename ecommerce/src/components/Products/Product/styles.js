import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    margin: '0 1rem 0 1rem',
    padding: '0 0 0 0',
    background: theme.palette.background.card,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    margin: '1.56rem 2.81rem 0 2.81rem',
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

