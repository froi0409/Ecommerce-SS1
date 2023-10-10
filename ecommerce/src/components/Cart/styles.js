import {makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {      
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(12),
    },
    root: {
      flexGrow: 1,      
    },
}));