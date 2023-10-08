import { Typography } from '@mui/material';
import React from 'react';
import { useStyles } from "./styles";

const ChatListItem = ({ chatItem }) => {
    const classes = useStyles();
    return (
        <li className={`${classes.content} ${chatItem.isActive ? classes.isActive : ''} `}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }} >
                {chatItem.title}
            </Typography>
            <Typography variant="subtitle1" >
                <div className={classes.format}>
                    {chatItem.lastMessage}
                </div>
            </Typography>
            <Typography variant="body2" >
                <div className={`${classes.format} ${classes.date}`}>
                    {chatItem.date}
                </div>
            </Typography>
        </li>
    );
}

export default ChatListItem;
