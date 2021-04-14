import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

const Chat = () => {
    const [ chat, setChat ] = useState([{ 
    message: "Welcome, enter a username and message to start chatting."}])
    const latestChat = useRef(null)
    const maxMgs = 5
    // if (chat.length > maxMgs) chat.shift();
    latestChat.current = chat;
    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/hubs/chat')
            .withAutomaticReconnect()
            .build();
        sendJoinMessage("Another user has joined");
        connection.start()
            .then(result => {
                connection.on('ReceiveMessage', message => {
                    const updatedChat = [...latestChat.current];
                    updatedChat.push(message);
                    setChat(updatedChat);
                });
                connection.on('Send', message => {
                    console.log(message)
                });
            })
            .catch(e => console.log('Connection failed: ', e));
    }, []);
    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };
        try {
            await  fetch('https://localhost:5001/chat/messages', { 
                method: 'POST', 
                body: JSON.stringify(chatMessage),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch(e) {
            console.log('Sending message failed.', e);
        }
    }

    const sendJoinMessage = async (message) => {
        const joinMessage = {
            message: message
        };

        try {
            await  fetch('https://localhost:5001/chat/join', { 
                method: 'POST', 
                body: JSON.stringify(joinMessage),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch(e) {
            console.log('Sending message failed.', e);
        }
    }

    return (
        <div>
            <ChatWindow chat={chat}/>
            <ChatInput sendMessage={sendMessage}  />

        </div>
    );
};

export default Chat;