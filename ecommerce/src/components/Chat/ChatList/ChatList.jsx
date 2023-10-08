import React from 'react';
import ChatListItem from './chatListItem/ChatListItem';
import ChatAdd from './ChatAdd/ChatAdd';
import {useStyles} from "./styles"

const ChatList = () => {
    const classes = useStyles();
    const chatItem = [
        { id: 1, title: 'Chat #1', lastMessage: 'Último mensaje 1', date: 'Enero 1', isActive: true },
        { id: 2, title: 'Chat #2', lastMessage: 'Último mensaje 2', date: 'Abril 22', isActive: false },
        { id: 3, title: 'Chat #3', lastMessage: 'Último mensaje 3', date: 'Mayo 3', isActive: false },
        { id: 4, title: 'Chat #4', lastMessage: 'Último mensaje 4', date: 'Junio 14', isActive: false },
        { id: 5, title: 'Chat #5', lastMessage: 'Último mensaje 5', date: 'Julio 5', isActive: false },
        { id: 6, title: 'Chat #6', lastMessage: 'Último mensaje 6', date: 'Agosto 8', isActive: false },
        { id: 7, title: 'Chat #7', lastMessage: 'Último mensaje 7', date: 'Septiembre 17', isActive: false },
        { id: 8, title: 'Chat #8', lastMessage: 'Último mensaje 8', date: 'Octubre 12', isActive: false },
        { id: 9, title: 'Chat #9', lastMessage: 'Último mensaje 9', date: 'Noviembre 9', isActive: false },
        { id: 10, title: 'Chat #10', lastMessage: 'Último mensaje 10', date: 'Diciembre 30', isActive: false },
        { id: 11, title: 'Chat #11', lastMessage: 'Último mensaje 11', date: 'Enero 2', isActive: false },
        { id: 12, title: 'Chat #12', lastMessage: 'Último mensaje 12', date: 'Febrero 14', isActive: false },
        { id: 13, title: 'Chat #13', lastMessage: 'Último mensaje 13', date: 'Marzo 8', isActive: false },
        { id: 14, title: 'Chat #14', lastMessage: 'Último mensaje 14', date: 'Abril 7', isActive: false },
        { id: 15, title: 'Chat #15', lastMessage: 'Último mensaje 15', date: 'Mayo 23', isActive: false },
        { id: 16, title: 'Chat #16', lastMessage: 'Último mensaje 16', date: 'Junio 30', isActive: false },
        { id: 17, title: 'Chat #17', lastMessage: 'Último mensaje 17', date: 'Julio 11', isActive: false },
        { id: 18, title: 'Chat #18', lastMessage: 'Último mensaje 18', date: 'Agosto 18', isActive: false },
        { id: 19, title: 'Chat #19', lastMessage: 'Último mensaje 19', date: 'Septiembre 4', isActive: false },
        { id: 20, title: 'Chat #20', lastMessage: 'Último mensaje 20', date: 'Octubre 9', isActive: false },
        { id: 21, title: 'Chat #21', lastMessage: 'Último mensaje 21', date: 'Noviembre 5', isActive: false },
        { id: 22, title: 'Chat #22', lastMessage: 'Último mensaje 22', date: 'Diciembre 22', isActive: false },
        { id: 23, title: 'Chat #23', lastMessage: 'Último mensaje 23', date: 'Enero 8', isActive: false },
        { id: 24, title: 'Chat #24', lastMessage: 'Último mensaje 24', date: 'Febrero 12', isActive: false },
        { id: 25, title: 'Chat #25', lastMessage: 'Último mensaje 25', date: 'Marzo 19', isActive: false },
        { id: 26, title: 'Chat #26', lastMessage: 'Último mensaje 26', date: 'Abril 20', isActive: false },
        { id: 27, title: 'Chat #27', lastMessage: 'Último mensaje 27', date: 'Mayo 28', isActive: false },
        { id: 28, title: 'Chat #28', lastMessage: 'Último mensaje 28', date: 'Junio 11', isActive: false },
        { id: 29, title: 'Chat #29', lastMessage: 'Último mensaje 29', date: 'Julio 14', isActive: false },
        { id: 30, title: 'Chat #30', lastMessage: 'Último mensaje 30', date: 'Agosto 10', isActive: false },
      ];
      
    return (
        <div className={classes.content}>
            <ul className={classes.ul}>
                {chatItem.map((item) => (
                    <ChatListItem chatItem={item} key={item.id} />
                ))}
            </ul>
            <ChatAdd />
        </div>
    );
}

export default ChatList;
