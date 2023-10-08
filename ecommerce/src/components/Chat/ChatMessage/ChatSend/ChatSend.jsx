import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import { useStyles } from './styles';

const ChatSend = () => {
  const classes = useStyles();
    return (
<div className={classes.content} >
        <Paper
          sx={{ p: '2px 15px', display: 'flex', alignItems: 'center', width: "100vh" }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Escribe un mensaje"
            inputProps={{ 'aria-label': 'send message' }}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SendIcon />
          </IconButton>
        </Paper>
</div>
      );
}

export default ChatSend;
