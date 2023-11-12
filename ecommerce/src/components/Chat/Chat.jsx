import { Grid } from '@mui/material';
import React from 'react';
import ChatList from './ChatList/ChatList';
import { useStyles } from "./styles";
import ChatMessage from './ChatMessage/ChatMessage';
import ChatInfo from './ChatInfo/ChatInfo';
import DeniedAuth from '../DeniedAuth/DeniedAuth';
import isAuthenticated from '../../config/auth';


const Chat = () => {
  const chatMessage = { title: 'Chat #1' }
  const classes = useStyles();
  if (!isAuthenticated()) {
    return <DeniedAuth />
  }
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="stretch"
      >
        <Grid item xs={3}> {/* El primer elemento ocupa el 20% */}
          <ChatList />
        </Grid>
        <Grid item xs={7}> {/* El segundo elemento ocupa el 60% */}
          <ChatMessage chatMessage={chatMessage} />
        </Grid>
        <Grid item xs={2}> {/* El tercer elemento ocupa el espacio restante */}
          <ChatInfo />
        </Grid>
      </Grid>
    </main>

  );
}

export default Chat;
