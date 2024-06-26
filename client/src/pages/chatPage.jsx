import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from '../components/ChatBubble';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/chatPage.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const ChatPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setfile] = useState(null);
  const messagesEndRef = useRef(null);

  const handlefileChange = (e) => {
    setfile(e.target.files[0]);
  };

  const handleSend = async () => {
    setIsLoading(true);
    if (input.trim() !== '') {
      const newMessage = { text: input, sender: 'user' };
      setMessages([...messages, newMessage]);

      const formData = new FormData();
      formData.append('prompt_text', input);
      if (file) {
        formData.append('prompt_file', file);
      }

      // clear inputs
      setInput('');
      setfile(null);
      try {
        const response = await axios.post('http://localhost:5000/api/chat-gemini', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const botResponse = { text: response.data.response, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botResponse]);

      } catch (error) {
        console.error('Error uploading file and text:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
            <div ref={messagesEndRef} />
          </div>
          <div className='input-div'>
            <div className="input-group ">
                <input
                    type="text"
                    className="form-control"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                />

                {/* File Input */}
                <label htmlFor="prompt_img">file:</label>
                <input type="file" id="prompt_img" onChange={handlefileChange} />

                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={handleSend}>
                    {isLoading ? <FontAwesomeIcon icon={faSpinner} spin size='1x'/>: 'Send'}
                    </button>
                </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ChatPage;