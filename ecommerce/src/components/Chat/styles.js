import {makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
    },
    root: {
      flexGrow: 1,      
    },
}));