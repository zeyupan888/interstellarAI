import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Chatbox.css';

function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const sendingRef = useRef(false);

  console.log('Chatbox component rendered');
  console.log('API Key:', process.env.REACT_APP_OPENAI_API_KEY);

  const sendMessage = async () => {
    if (input.trim() === '' || isLoading || sendingRef.current) return;

    sendingRef.current = true;
    setIsLoading(true);
    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }]
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      const botReply = response.data.choices[0].message.content;
      setMessages([...newMessages, { text: botReply, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, { text: "Sorry, I couldn't process that request. Please try again later.", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
      sendingRef.current = false;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbox">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className="message bot">Thinking...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading || input.trim() === ''}>Send</button>
      </div>
    </div>
  );
}

export default Chatbox;
