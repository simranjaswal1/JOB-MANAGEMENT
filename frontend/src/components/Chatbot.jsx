import React, { useState, useEffect } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hey there! 👋 How can I help you today?", sender: "bot" },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isVisible, setIsVisible] = useState(false); // State to control visibility
  const [timer, setTimer] = useState(null); // Timer to reset messages

  // Function to handle user input
  const handleUserInput = (e) => setUserInput(e.target.value);

  // Function to send the message
  const sendMessage = () => {
    if (!userInput.trim()) return; // Don't send empty messages

    // Add user message to the chat first
    const newMessages = [
      ...messages,
      { text: userInput, sender: "user" },
    ];
    setMessages(newMessages);
    setUserInput(''); // Clear the input field

    // Reset the timer whenever a new message is sent
    resetTimer();

    // Simulate bot response
    getBotResponse(userInput, newMessages);
  };

  // Function to simulate bot response with more detailed information
  const getBotResponse = (input, currentMessages) => {
    let botResponse = "Oops, I didn't catch that. Could you try again? 😕";

    // Predefined responses (could be dynamic or API-driven)
    if (input.toLowerCase().includes("hello")) {
      botResponse = "Hi there! How can I assist you today? 😊";
    } else if (input.toLowerCase().includes("how to apply for jobs")) {
      botResponse = (
        <div>
          <p>To apply for a job, follow these steps:</p>
          <ul>
            <li>1. Browse available job listings.</li>
            <li>2. Select the job you're interested in.</li>
            <li>3. Fill out the application form.</li>
            <li>4. Upload your resume and submit the application.</li>
          </ul>
          <p>Want to see the job listings now? <a href="/jobs">Click here</a>.</p>
        </div>
      );
    } else if (input.toLowerCase().includes("login")) {
      botResponse = "You can log in by clicking the 'Login' button on the top right of the page. If you don't have an account, you can sign up easily.";
    } else if (input.toLowerCase().includes("signup")) {
      botResponse = "To sign up, click the 'Sign Up' button on the top right, and follow the instructions to create your account.";
    } else if (input.toLowerCase().includes("resumes")) {
      botResponse = "You can upload and manage your resume through your profile page. Make sure to keep it updated!";
    } else if (input.toLowerCase().includes("profile")) {
      botResponse = "Your profile contains your personal information, job preferences, and the resumes you’ve uploaded. You can update your profile anytime!";
    } else if (input.toLowerCase().includes("applications")) {
      botResponse = "To check your applications, simply visit the 'My Applications' section in your dashboard. You will see the status of each application.";
    } else if (input.toLowerCase().includes("filters")) {
      botResponse = "You can filter job listings by location, job type (full-time, part-time, etc.), and salary range to find the best fit for you.";
    } else if (input.toLowerCase().includes("thank you")) {
      botResponse = "You're welcome! Let me know if you need anything else. 😄";
    }

    // Add bot response to the chat
    const updatedMessages = [
      ...currentMessages,
      { text: botResponse, sender: "bot" },
    ];

    setMessages(updatedMessages);
  };

  // Function to close the chatbot
  const closeChatbot = () => {
    setIsVisible(false); // Hide the chatbot
  };

  // Function to toggle chatbot visibility
  const toggleChatbot = () => {
    setIsVisible(true); // Show the chatbot
    resetTimer(); // Reset timer when chatbot is opened
  };

  // Function to reset the timer
  const resetTimer = () => {
    if (timer) {
      clearTimeout(timer); // Clear any existing timer
    }

    // Set a new timer to clear chat messages after 2 minutes
    const newTimer = setTimeout(() => {
      setMessages([]); // Clear messages after 2 minutes
    }, 120000); // 120000 ms = 2 minutes

    setTimer(newTimer); // Store the timer reference
  };

  if (!isVisible) return <div className="chatbot-toggle" onClick={toggleChatbot}>🐱</div>; // Cute emoji as the toggle icon

  return (
    <div className="chatbot-container p-4 bg-white dark:bg-gray-800 shadow-xl rounded-2xl max-w-sm mx-auto">
      <div className="chatbox overflow-y-auto max-h-72 mb-4 p-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message mb-3 p-3 rounded-md ${message.sender === 'bot' ? 'bg-blue-100 text-gray-800' : 'bg-green-100 text-gray-800'}`}
            style={{
              textAlign: message.sender === 'bot' ? 'left' : 'right', // Align messages differently
              width: '100%', // Ensure messages have consistent width
              maxWidth: '90%', // Ensure messages do not stretch too wide
              marginLeft: message.sender === 'bot' ? '10px' : 'auto', // Align left for bot and right for user
              marginRight: message.sender === 'user' ? '10px' : 'auto', // Align right for user
            }}
          >
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <div className="input-container flex items-center bg-transparent">
        <input
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Type a message..."
          className="input border rounded-xl p-3 w-full mb-3 bg-transparent dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          className="send-btn ml-3 p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all duration-300 ease-in-out"
        >
          Send
        </button>
      </div>

      <span
        className="chatbot-close absolute top-2 right-2 text-2xl cursor-pointer text-gray-800 dark:text-white hover:text-red-500 transition-all duration-300"
        onClick={closeChatbot}
      >
        ×
      </span>
    </div>
  );
};

export default Chatbot;
