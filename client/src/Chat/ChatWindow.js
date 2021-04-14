import React, { useEffect, useRef } from 'react';

import Message from './Message';

const ChatWindow = (props) => {
    const messageEndRef = useRef(null)
    const scrollToBottom = () =>
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth'})
    const chat = props.chat
        .map(m => <Message 
            key={Date.now() * Math.random()}
            user={m.user}
            message={m.message}/>);
    useEffect(() => {
        scrollToBottom()
    }, [chat])
    return(
        <div style={{ overflow: 'hidden' }}> 
            <div style={{ display: 'block', 
                          maxHeight: '90vh', 
                          overflowY: 'scroll',
                          marginRight: '-50px',
                          paddingRight: '50px'}}>
                {chat}
                <div ref={messageEndRef}/>
            </div>
        </div>
    )
};

export default ChatWindow;