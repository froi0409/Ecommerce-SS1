import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useStyles } from '../styles';

const ChatAdd = () => {
    const classes = useStyles();
    return (
        <Box className={classes.box}
            sx={{
                // width: 500,
                maxWidth: '80vh',
                display: 'flex',          // Establece la visualización como flex
                flexDirection: 'row',    // Organiza los elementos en una fila
                alignItems: 'left',    // Centra verticalmente los elemento
                margin: "0 1rem",
            }}
        >
            <TextField fullWidth label="Nuevo Chat" id="newchat" sx={{background: 'white'}} />
            <IconButton aria-label="new_chat" color="primary">
                <AddCircleIcon style={{ fontSize: '2.5rem' }}  />
            </IconButton>
        </Box>
    );
}

export default ChatAdd;
