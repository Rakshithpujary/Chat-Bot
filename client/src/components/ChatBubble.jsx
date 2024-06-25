import React from 'react';
import { motion } from 'framer-motion';

const ChatBubble = ({ message, sender }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className={`chat-bubble ${sender === 'user' ? 'bg-primary text-white' : 'bg-light'}`}
    style={{ padding: '10px', borderRadius: '15px', marginBottom: '10px', maxWidth: '80%' }}
  >
    {message}
  </motion.div>
);

export default ChatBubble;
