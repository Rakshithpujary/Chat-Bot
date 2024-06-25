import React, { useState } from 'react';
import ChatBubble from '../components/ChatBubble';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/chatPage.css';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);
      setInput('');

      // Simulate bot response after a short delay (for demonstration purposes)
      setTimeout(() => {
        const botResponse = { text: 'This is a simulated response.', sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 500);
    }
  };

  return (
    <div className="chat-page">
      <div className="card">
        <div className="card-header text-center">
          <h1>Chat-Bot</h1>
        </div>
        <div className="card-body chat-window">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <ChatBubble key={index} message={msg.text} sender={msg.sender} />
            ))}
          </div>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={e => e.key === 'Enter' && handleSend()}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
