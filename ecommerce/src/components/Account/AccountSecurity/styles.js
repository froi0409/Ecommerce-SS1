import {makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {      
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(12),
      height: '100vh',
    },
    root: {
      flexGrow: 1,      
    },
    title: {
        marginBottom: '2.56rem',
    }
}));