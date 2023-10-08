import { Box, Typography, Avatar, Grid } from '@mui/material';
import React from 'react';
import { useStyles } from './styles';

const ChatMessageItem = ({message}) => {
    const classes = useStyles();
    if (message.isMe) {
        return (
            <li className={classes.messages}>
            <Grid container justifyContent="flex-end" >
                <Typography variant="body1">
                    <div className={`${classes.myMessage} ${classes.formatMessage}`} >
                        {message.content}
                    </div>
                </Typography>
            </Grid>
            </li>
        );
    }

    return (
        <li className={classes.messages}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>

            <Avatar sx={{ width: 40, height: 40 }} alt={message.name} src={message.icon} />
            <div className={classes.formatMessage} >
                <Typography variant="body1" sx={{ marginTop: '1px' }}>
                    {message.content}
                </Typography>
            </div>
            </Box>
        </li>
    );
}

export default ChatMessageItem;
