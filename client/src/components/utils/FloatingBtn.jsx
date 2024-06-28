import React, { useEffect, useState } from 'react';
import { ImArrowDown2 } from "react-icons/im"; // Changed to down arrow for scrolling down

const FloatingScrollBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const chatWindow = document.querySelector('.chat-messages');
    if (chatWindow) {
      if (chatWindow.scrollTop < chatWindow.scrollHeight - chatWindow.clientHeight - 200) {
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
      className="scroll-to-bottom-float-btn"
      onClick={scrollToBottom}
      style={{
        display: isVisible ? 'flex' : 'none',
        position: 'fixed',
        bottom: '20px',
        right: '25px',
        backgroundColor: '#2466a8',
        color: 'white',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        zIndex: 1000,
      }}
    >
      <ImArrowDown2 />
    </div>
  );
};

export default FloatingScrollBtn;
