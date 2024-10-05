import React from 'react';
import Chatbox from './components/Chatbox';
import './App.css';

function App() {
  console.log('App component rendered');
  return (
    <div className="App">
      {/* ... other components ... */}
      <section id="chat">
        <h2>AI Chat Assistant</h2>
        <Chatbox />
      </section>
    </div>
  );
}

export default App;