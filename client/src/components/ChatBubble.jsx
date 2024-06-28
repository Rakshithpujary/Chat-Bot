import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Markdown from 'react-markdown';

const ChatBubble = ({ message, sender }) => {
  // Determine the background color based on the sender
  let backgroundColor;
  let textColor;

  switch (sender) {
    case 'user':
      backgroundColor = 'blue';
      textColor = 'white';
      break;
    case 'bot':
      backgroundColor = 'white';
      textColor = 'black';
      break;
    case 'botError':
      backgroundColor = 'red';
      textColor = 'white';
      break;
    default:
      backgroundColor = 'gray';
      textColor = 'black';
  }

  // State to track hover state
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="chat-bubble"
      style={{
        padding: '10px',
        borderRadius: '15px',
        marginBottom: '10px',
        maxWidth: '60%',
        alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
        backgroundColor: backgroundColor,
        color: textColor,
       boxShadow: isHovered ? `0 2px 10px ${backgroundColor}` : 'none', // Box shadow based on hover state
      //  boxShadow:`0px 2px 10px ${backgroundColor}`,
        cursor: 'pointer', // Optional: Change cursor on hover
       transition: 'box-shadow 0.3s ease-in-out' 
      }}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <Markdown style={{ margin: '0px' }}>{message}</Markdown>
    </motion.div>
  );
};

export default ChatBubble;
