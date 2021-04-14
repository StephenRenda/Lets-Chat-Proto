import React, { useState } from 'react';

const ChatInput = (props) => {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const isUserProvided = user && user !== '';
        const isMessageProvided = message && message !== '';

        if (isUserProvided && isMessageProvided) {
            props.sendMessage(user, message);
            setMessage("");
        } 
        else {
            alert('Please insert an user and a message.');
        }
    }

    const onUserUpdate = (e) => {
        setUser(e.target.value);
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }
    return (
        <form 
            style={{ position: 'fixed',bottom: 20,width: "90vw", minWidth: '100px'}}
            onSubmit={onSubmit}>
            {user=='' && <label htmlFor="user">Enter username: </label>}
            <input 
                style={(user=='')? {}: {borderStyle: 'hidden'}}
                id="user" 
                name="user" 
                value={user==''?"":user}
                onChange={onUserUpdate} />
            <br/>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                <input 
                    style={{width: "90%", minWidth: '100px', maxWidth: '1000px'}}
                    type="text"
                    id="message"
                    name="message" 
                    value={message}
                    onChange={onMessageUpdate} />
                <button>Submit</button>
            </div>
        </form>
    )
};

export default ChatInput;