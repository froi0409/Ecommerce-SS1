import { Typography } from '@mui/material';
import React from 'react';
import ChatMessageItem from './ChatMessageItem/ChatMessageItem';
import ChatSend from './ChatSend/ChatSend';
import { useStyles } from './styles';

const ChatMessage = ({ chatMessage }) => {
    const classes = useStyles();
    const messages = [
        { id: 1, isMe: false, content: 'Mensaje de prueba enviado', icon: "/static/images/avatar/7.jpg", name: "Luis Manuel Lopez" },
        { id: 2, isMe: true, content: 'Mi mensaje enviado', icon: "/static/images/avatar/1.jpg", name: "H S" },
        { id: 3, isMe: false, content: 'Mensaje de prueba 2 enviado', icon: "/static/images/avatar/8.jpg", name: "Juan Perez" },
        { id: 4, isMe: false, content: 'Otro mensaje', icon: "/static/images/avatar/2.jpg", name: "Luis Manuel Lopez" },
        { id: 5, isMe: false, content: 'Respuesta', icon: "/static/images/avatar/3.jpg", name: "Juan Perez" },
        { id: 6, isMe: true, content: 'Mensaje importante', icon: "/static/images/avatar/4.jpg", name: "H S" },
        { id: 7, isMe: false, content: 'Mensaje de grupo', icon: "/static/images/avatar/5.jpg", name: "Juan Perez" },
        { id: 8, isMe: true, content: 'Saludos', icon: "/static/images/avatar/6.jpg", name: "H S" },
        { id: 9, isMe: false, content: 'Hola, ¿cómo estás?', icon: "/static/images/avatar/7.jpg", name: "Luis Manuel Lopez" },
        { id: 10, isMe: true, content: 'Bien, gracias', icon: "/static/images/avatar/8.jpg", name: "H S" },
        { id: 11, isMe: false, content: '¿Qué has estado haciendo?', icon: "/static/images/avatar/1.jpg", name: "Luis Manuel Lopez" },
        { id: 12, isMe: true, content: 'Trabajando en un proyecto', icon: "/static/images/avatar/2.jpg", name: "H S" },
        { id: 13, isMe: false, content: 'Suena interesante', icon: "/static/images/avatar/3.jpg", name: "Luis Manuel Lopez" },
        { id: 14, isMe: true, content: 'Sí, lo es', icon: "/static/images/avatar/4.jpg", name: "H S" },
        { id: 15, isMe: false, content: '¡Buena suerte!', icon: "/static/images/avatar/5.jpg", name: "Luis Manuel Lopez" },
        { id: 16, isMe: true, content: 'Gracias', icon: "/static/images/avatar/6.jpg", name: "H S" },
        { id: 17, isMe: false, content: 'Mensaje de ejemplo', icon: "/static/images/avatar/7.jpg", name: "Juan Perez" },
        { id: 18, isMe: true, content: 'Otro mensaje de ejemplo', icon: "/static/images/avatar/8.jpg", name: "H S" },
      ];

    return (
        <div className={classes.content}>
            <Typography variant="h3">
                <div className={classes.title} >
                {chatMessage.title}
                </div>
            </Typography>
            <ul className={classes.ul}>
                {messages.map((message) => (
                    <ChatMessageItem key={message.id} message={message} />
                ))}
            </ul>
            <ChatSend />
        </div>
    );
}

export default ChatMessage;
