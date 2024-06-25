import React from 'react';
import { motion } from 'framer-motion';

const ChatBubble = ({ message, sender }) => (
    <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`chat-bubble ${sender === 'user' ? 'bg-primary text-white user' : 'bg-light bot'}`}
    style={{
      padding: '10px',
      borderRadius: '15px',
      marginBottom: '10px',
      maxWidth: '50%',
      alignSelf: sender === 'user' ? 'flex-end' : 'flex-start'
    }}
  >
    {message}
  </motion.div>
);

export default ChatBubble;
