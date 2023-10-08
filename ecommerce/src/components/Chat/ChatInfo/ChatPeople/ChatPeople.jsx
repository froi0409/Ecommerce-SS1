import { Box, Avatar, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './styles';

const ChatPeople = ({people}) => {
    const classes = useStyles();
    return (
        <li className={classes.content}>
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Avatar sx={{ width: 40, height: 40 }} alt={people.name} src={people.icon} />
            <Typography variant="body1" sx={{ marginTop: '1px' }}>
                {people.name}
            </Typography>
            </Box>
        </li>
    );
}

export default ChatPeople;
