import { Typography } from '@mui/material';
import React from 'react';
import ChatPeople from './ChatPeople/ChatPeople';
import ChatAddUser from './ChatAddUser/ChatAddUser';
import { useStyles } from './styles';

const ChatInfo = ({ chatInfo }) => {
    const classes = useStyles();
    const title = "Personas en el chat"
    const peoples = [
        { id: 1, name: "Juan Perez", icon: "/static/images/avatar/8.jpg" },
        { id: 2, name: "Luis Manuel Lopez", icon: "/static/images/avatar/9.jpg" },
    ]

    return (
        <div className={classes.content}>
            <Typography variant="h5" >
            <div className={classes.title} >
                {title}
            </div>
            </Typography>
            <ul className={classes.ul}>
                {peoples.map(people => (
                    <ChatPeople people={people} />
                ))}
            </ul>
            <ChatAddUser />
        </div>
    );
}

export default ChatInfo;
