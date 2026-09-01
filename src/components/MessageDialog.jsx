import { useState, memo, useCallback, useEffect } from 'react';
import './MessageDialog.css';

const MessageDialog = memo(({ user, onClose, dedePOV = false }) => {
  // If Dede's POV, initialize with Robert's message already received
  const [messages, setMessages] = useState(dedePOV ? [
    { text: "Hey, Dede! Anything fun going on tonight?", sender: 'other', timestamp: new Date() }
  ] : []);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStep, setConversationStep] = useState(dedePOV ? 1 : 0);

  const handleSendMessage = useCallback(() => {
    if (inputText.trim()) {
      setMessages(prev => [...prev, { text: inputText, sender: 'user', timestamp: new Date() }]);
      setInputText('');

      // Only trigger next step in Dede's POV
      if (dedePOV && conversationStep === 1) {
        // Dede's POV: After Dede responds, Robert will auto-reply
        setConversationStep(2);
      }
      // Robert's POV: No auto-progression, conversation ends after he sends
    }
  }, [inputText, conversationStep, dedePOV]);

  // Scripted conversation flow - ONLY for Dede's POV
  useEffect(() => {
    if (!dedePOV) {
      // Robert's POV: NO scripted conversation, NO auto-responses
      return;
    }

    // DEDE'S POV ONLY - scripted conversation
    if (conversationStep === 2) {
      // After Dede sends her response, show typing indicator for Robert
      const typingDelay = setTimeout(() => {
        setIsTyping(true);
      }, 1000);

      const responseTimer = setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          text: "Great! What's the Address?",
          sender: 'other', // Robert's message
          timestamp: new Date()
        }]);
        setConversationStep(3); // Conversation complete
      }, 4000); // 3 second delay (1s + 3s)

      return () => {
        clearTimeout(typingDelay);
        clearTimeout(responseTimer);
      };
    }
  }, [conversationStep, dedePOV]);

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

          {isTyping && (
            <div className="message message-received">
              <div className="message-bubble typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
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
