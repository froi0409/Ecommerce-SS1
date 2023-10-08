import {makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  content: {
      flexGrow: 1,
      // backgroundColor: theme.palette.background.default,
      cursor: "pointer",
      userSelect : "none"
    },
    root: {
      flexGrow: 1,      
    },
    isActive: {
      backgroundColor: "#9EC5FE",
    },
    format: {
      opacity : "0.5",
    },
    date: {
      textAlign: "right",
    }
}));