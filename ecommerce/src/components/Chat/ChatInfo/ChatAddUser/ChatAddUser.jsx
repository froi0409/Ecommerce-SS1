import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ChatAddUser = () => {
    return (
        <Box
            sx={{
                // width: 500,
                maxWidth: '100vh',
                display: 'flex',          // Establece la visualización como flex
                flexDirection: 'row',    // Organiza los elementos en una fila
                alignItems: 'left',    // Centra verticalmente los elemento
                margin: "0 5px",
            }}
        >
            <TextField fullWidth label="Agregar Usuario" id="newchat" sx={{background: 'white', borderRadius: '5px'}} />
            <IconButton aria-label="new_chat" color="primary">
                <AddCircleIcon style={{ fontSize: '2rem' }}  />
            </IconButton>
        </Box>
    );
}

export default ChatAddUser;
