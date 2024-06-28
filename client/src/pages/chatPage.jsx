import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from '../components/ChatBubble';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/chatPage.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { MdOutlineUploadFile } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { toast } from 'react-toastify';
import { toastErrorStyle } from '../components/utils/toastStyle';

const ChatPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [img, setImg] = useState(null);
  const [imgPreview,setImgPreview] = useState(null);
  const [isImgUploadVisible, setIsImgUploadVisible] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
    setIsImgUploadVisible(true)
  };

  useEffect(()=>{
    if(img === null) return;
    const imageUrl = URL.createObjectURL(img);
    setImgPreview(imageUrl);
    setIsImgUploadVisible(true);
  },[img]);

  const handleSend = async () => {
    setIsLoading(true);

    const newMessage = { text: input, sender: 'user' };
    setMessages([...messages, newMessage]);

    const formData = new FormData();
    formData.append('prompt_text', input);
    if (img) {
      formData.append('prompt_img', img);
    }

    // clear inputs and references
    setInput('');
    setImg(null);
    setImgPreview(null);
    setIsImgUploadVisible(false);
    if (fileInputRef.current)
      fileInputRef.current.value = '';
    
    try {
      const response = await axios.post('http://localhost:5000/api/chat-gemini', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const botResponse = { text: response.data.response, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botResponse]);

    } catch (error) {
      if (error.response && error.response.data && error.response.data.errorMsg) {
        const botResponse = { text: error.response.data.errorMsg, sender: 'botError' };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      } else
        toast.error(error.message || error, toastErrorStyle());

      console.error('Error uploading file and text:', error.message || error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleRemoveImage = () => {
    setImg(null);
    setImgPreview(null);
    setIsImgUploadVisible(false);
    if (fileInputRef.current)
      fileInputRef.current.value = '';
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
            <div ref={messagesEndRef} />
          </div>
          <div className='input-div'>
          <div className="input-group-div">
            {!isImgUploadVisible && (
                <MdOutlineUploadFile className='upload-icon' onClick={() => fileInputRef.current.click()} />
              )}
                <input 
                type="file" 
                id="prompt_img" 
                onChange={handleImgChange} 
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*" // This attribute allows only image files to be selected
                />

                {isImgUploadVisible && (
                  <div className='preview-image-div'>
                    <img src={imgPreview} alt="File Preview" className="preview-image" />
                    <IoMdCloseCircleOutline className='close-icon' onClick={handleRemoveImage} />
                  </div>
                )}

                <input
                    type="text"
                    className="form-control"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={e => e.key === 'Enter' && handleSend()}
                />

                {/* File Input */}
                <button className="btn btn-primary" onClick={handleSend} disabled={!input.trim()}>
                    {isLoading ? <FontAwesomeIcon icon={faSpinner} spin size='1x'/>: 'Send'}
                </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ChatPage;