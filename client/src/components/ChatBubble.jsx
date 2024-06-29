import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Markdown from 'react-markdown';
import { InView } from 'react-intersection-observer';
import '../css/ChatBubble.css';

const ChatBubble = ({ message, sender, img = null }) => {
  // Determine the background color based on the sender
  let backgroundColor;
  let textColor;
  let shadowColor;

  switch (sender) {
    case 'user':
      backgroundColor = '#2466a8';
      textColor = 'white';
      shadowColor="#0000ffb0"
      break;
    case 'bot':
      backgroundColor = 'white';
      textColor = 'black';
      shadowColor="#ffffffb1"
      break;
    case 'botError':
      backgroundColor = 'red';
      textColor = 'white';
      shadowColor="#ff0000b5"
      break;
    default:
      backgroundColor = 'gray';
      textColor = 'black';
      shadowColor="white"
  }

  // State to track hover state
  // const [isHovered, setIsHovered] = useState(false);

  return (
    <InView threshold={0}>
      {({ inView, ref }) => (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="chat-bubble"
        style={{
          padding: '10px',
          borderRadius: '15px',
          marginBottom: '50px',
          maxWidth: '60%',
          alignSelf: sender === 'user' ? 'flex-end' : 'flex-start',
          backgroundColor: backgroundColor,
          color: textColor,
          boxShadow: `2px 4px 7px ${shadowColor}`,
        transition: 'box-shadow 0.2s ease-in-out' 
        }}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
      >
        {
          img && sender === 'user' &&
            <div className='img-div'>
              <img key={`${Date.now()}-${Math.random()}`} src={img} alt="img" 
              className='responsive-img'
              style={{borderRadius: '10px', 
              marginBottom: '10px'}}/>
            </div>
        }
        <Markdown style={{ margin: '0px' }}>{message}</Markdown>
      </motion.div>
      )}
    </InView>
  );
};

export default ChatBubble;
