import { useState, memo, useCallback } from 'react';
import './MessageDialog.css';

const MessageDialog = memo(({ user, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = useCallback(() => {
    if (inputText.trim()) {
      setMessages(prev => [...prev, { text: inputText, sender: 'user', timestamp: new Date() }]);
      setInputText('');
    }
  }, [inputText]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage]);

  return (
    <div className="message-dialog-overlay">
      <div className="message-dialog">
        <div className="message-header">
          <button className="back-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="#343434" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <div className="match-info">
            <div className="match-avatar" style={{ backgroundImage: `url(${user.image})` }} />
            <h3>{user.name}</h3>
          </div>
          <div className="header-spacer" />
        </div>

        <div className="messages-container">
          <div className="match-announcement">
            <p>You matched with {user.name}</p>
            <span className="match-date">{new Date().toLocaleDateString()}</span>
          </div>

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.sender === 'user' ? 'message-sent' : 'message-received'}`}
            >
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
        </div>

        <div className="message-input-container">
          <input
            type="text"
            className="message-input"
            placeholder="Type a message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="send-btn"
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill={inputText.trim() ? '#343434' : '#ADADAD'}
                d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

MessageDialog.displayName = 'MessageDialog';

export default MessageDialog;
