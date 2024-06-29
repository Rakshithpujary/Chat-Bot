import React, { useEffect, useState } from 'react';
import { ImArrowDown2 } from "react-icons/im"; // Changed to down arrow for scrolling down

const FloatingScrollBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const chatWindow = document.querySelector('.chat-messages');
    if (chatWindow) {
      if (chatWindow.scrollTop < chatWindow.scrollHeight - chatWindow.clientHeight - 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  const scrollToBottom = () => {
    const chatWindow = document.querySelector('.chat-messages');
    if (chatWindow) {
      chatWindow.scrollTo({
        top: chatWindow.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const chatWindow = document.querySelector('.chat-messages');
    if (chatWindow) {
      chatWindow.addEventListener('scroll', toggleVisibility);
      return () => {
        chatWindow.removeEventListener('scroll', toggleVisibility);
      };
    }
  }, []);

  return (
    <div
      className="scroll-to-bottom-float-btn-custom"
      onClick={scrollToBottom}
      style={{
        display: isVisible ? 'flex' : 'none',
      }}
    >
      <ImArrowDown2 />
    </div>
  );
};

export default FloatingScrollBtn;
