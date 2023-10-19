import {makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(0.5),
    },
    root: {
      flexGrow: 1,      
    },
}));