import React, { useState, useEffect, useRef } from 'react';

const GroupChat = () => {
    const [userChatMessage, setUserChatMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [error, setError] = useState('');
    const [loggedInUser, setLoggedInUser] = useState(null);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const allGroupChat = localStorage.getItem('chats')
            ? JSON.parse(localStorage.getItem('chats'))
            : [];
        setChatMessages(allGroupChat);

        // loggedInUser 
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user) {
            setLoggedInUser(user);
        }

    }, []);

    // Scroll to the bottom of the chat container
    useEffect(() => {        
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, [chatMessages]);

    const formatDateTime = (date) => {
        return date.toLocaleString();
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        // Message Validation
        if (userChatMessage === '') {
            setError('Please enter a message');
            return;
        }

        const dateTime = formatDateTime(new Date());

        const chatMessage = {
            dateTime: dateTime,
            fullname: loggedInUser.fullname,
            userChatMessage: userChatMessage,
        };

        // Update chat messages in state and local storage
        const updatedChatMessages = [...chatMessages, chatMessage];
        setChatMessages(updatedChatMessages);
        localStorage.setItem('chats', JSON.stringify(updatedChatMessages));

        // Clear the input
        setUserChatMessage('');
        setError('');
    };

    // Refresh the page
    const handleRefresh = () => {
        window.location.reload();
      };

    return (<>
        <h1 className="text-left pageHeader">Group Chat</h1>
        <div className="chatBox">
            <div className="chatMessageBlock" ref={chatContainerRef}>
                {chatMessages.map((message, index) => (
                    <div key={index} className={`chat-message ${loggedInUser && message.fullname === loggedInUser.fullname ? 'message-right' : ''}`} >
                        <div> <span>[{message.dateTime}]</span> <strong>{message.fullname} : </strong> {message.userChatMessage}</div>
                    </div>
                ))}
            </div>
            <div className="chatForm">
                <form onSubmit={handleSendMessage}>
                    {loggedInUser && (
                        <strong className="fullname">{loggedInUser.fullname}</strong>
                    )}
                    <div className="w-100">
                        <input type="text" id="userChatMessage" value={userChatMessage} onChange={(e) => setUserChatMessage(e.target.value)} placeholder="Type here..." className="form-control" />
                        {error && <span className="error">{error}</span>}
                    </div>
                    <button type="submit" className="btn btn-default">Send</button>
                    <a className="btn btn-default" onClick={handleRefresh}>Refresh</a>
                </form>
                
            </div>
        </div>
    </>
    );
};

export default GroupChat;
