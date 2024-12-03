import React from "react";
import ChatBot from "../components/ChatBot";

const ChatPage = () => {
  return (
<div
  style={{
    display: "flex",
    justifyContent: "flex-end", // Align to the right
    alignItems: "center", // Center vertically
    height: "100vh", // Full height of the viewport
    backgroundColor: "#f8f9fa", // Light gray background
    padding: "20px",
    textAlign: "left", // Prevent inherited center text alignment
  }}
>
  <div
    style={{
      width: "400px",
      border: "1px solid #ddd",
      borderRadius: "16px", // Increased border radius for more rounded edges
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      backgroundColor: "#fff", // White background
      color: "#000", // Black text
    }}
  >
    <ChatBot />
  </div>
</div>

  );
};

export default ChatPage;
