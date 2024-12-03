import React, { useState, useEffect, useRef } from "react";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentMenu, setCurrentMenu] = useState("main");

  const chatContainerRef = useRef(null);

  // Main Menu and Help options
  const mainMenuOptions = [
    { question: "Hi", answer: "Hello! How can I assist you today?" },
    { question: "Help", answer: "Here are some options to help you:" },
    { question: "Thank you", answer: "You're welcome! Let me know if you need anything else." },
  ];

  const helpMenuOptions = [
    { question: "How can I create an account?", answer: "You can create an account by signing up on our website. You'll need your apartment details to register." },
    { question: "I forgot my password, what should I do?", answer: "Click on the 'Forgot Password' link on the login page, and we'll guide you through the recovery process." },
    { question: "How do I file a complaint?", answer: "To file a complaint, go to the 'Complaints' section, fill out the form with your issue details, and submit it. We will review it and get back to you." },
    { question: "Can I file an anonymous complaint?", answer: "Yes, we allow anonymous complaints if you prefer not to share your identity. Just check the 'anonymous' option when filing a complaint." },
    { question: "How do I track a parcel?", answer: "You can track your parcels by visiting the 'Parcels' section. Simply enter the tracking number and you'll see its status." },
    { question: "How can I view the latest community announcements?", answer: "You can view the latest announcements on the 'Announcements' page. We'll also notify you through email or app notifications." },
    { question: "How can I connect with other residents in my building?", answer: "You can join the community chat where you can interact with other residents and stay updated on local happenings." },
    { question: "Thank you", answer: "You're welcome! Let me know if you need anything else." },
  ];

  // Scroll to the bottom of the chat container whenever messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Show the initial message and main menu when the component first loads
  useEffect(() => {
    setMessages([
      { sender: "bot", text: "Hello! How can I assist you today? Please choose an option." },
    ]);
    setSuggestions(mainMenuOptions);
  }, []);

  // Handle user input or button clicks to send messages
  const handleMessage = (input) => {
    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput("");
    setLoading(true);

    let botResponse = { sender: "bot", text: "" };

    if (input === "Help") {
      setCurrentMenu("help");
      botResponse = { sender: "bot", text: "Here are some options to help you:" };
      setSuggestions(helpMenuOptions); // Update suggestions to help menu options
    } else if (input === "Hi") {
      botResponse = { sender: "bot", text: "Hello! How can I assist you today?" };
      setSuggestions(mainMenuOptions);
    } else if (input === "Thank you") {
      botResponse = { sender: "bot", text: "You're welcome! Let me know if you need anything else." };
      setSuggestions(mainMenuOptions);
    } else {
      botResponse = { sender: "bot", text: "Sorry, I didn't understand that. Please select an option." };
    }

    setMessages((prevMessages) => [...prevMessages, botResponse]);
    setLoading(false);
  };

  // Handle selecting a suggestion from the menu
  const handleSuggestionClick = (suggestion) => {
    handleMessage(suggestion.question); // Treat button clicks as sending a message
  };

  // Return to the main menu
  const handleBackToMainMenu = () => {
    setMessages([
      { sender: "bot", text: "You are back to the main menu. Please choose from the options below." },
    ]);
    setSuggestions(mainMenuOptions); // Reset to main menu options
    setCurrentMenu("main");
  };

  return (
    <div
      style={{
        width: "400px",
        margin: "0 auto",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        backgroundColor: "#fff",
        position: "fixed",
        right: "20px",
        top: "20px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>ChatBot Assistant</h2>
      <div
        ref={chatContainerRef}
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.sender === "user" ? "right" : "left",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                backgroundColor: message.sender === "user" ? "#007bff" : "#f1f1f1",
                color: message.sender === "user" ? "#fff" : "#000",
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "10px",
                maxWidth: "75%",
              }}
            >
              {message.text}
            </p>
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>

      {suggestions.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                flex: "1 1 calc(50% - 10px)",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#333",
                color: "#fff",
                border: "1px solid #444",
                cursor: "pointer",
              }}
            >
              {suggestion.question}
            </button>
          ))}

          {currentMenu === "help" && (
            <button
              onClick={handleBackToMainMenu}
              style={{
                flex: "1 1 100%",
                padding: "10px",
                borderRadius: "8px",
                backgroundColor: "#006400",
                color: "#fff",
                border: "1px solid #444",
                cursor: "pointer",
              }}
            >
              Back to Main Menu
            </button>
          )}
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleMessage(userInput)}
          placeholder="Type a message..."
          style={{
            flex: 1,
            height: "40px",
            padding: "8px 12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            marginRight: "10px",
          }}
        />
        <button
          onClick={() => handleMessage(userInput)}
          style={{
            height: "40px",
            padding: "0 16px",
            fontSize: "16px",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
