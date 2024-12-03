const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Define the main menu options and QA responses
const mainMenu = [
  { question: "Hi", answer: "Hello! How can I assist you today?" },
  { question: "Help", answer: "You can ask me about our services, hours of operation, or any support questions." },
  { question: "What services do you offer?", answer: "We provide web development, app development, and more." },
  { question: "What are your hours?", answer: "Our office hours are Monday to Friday, 9 AM to 5 PM." },
  { question: "Thank you", answer: "You're welcome! Let me know if you need anything else." },
];

// Handle chat messages
app.post("/chat", (req, res) => {
  const userMessage = req.body.message.toLowerCase();

  let suggestions = [];
  let responseMessage = "Sorry, I didn't understand that. Here are some suggestions:";

  // Match user input and provide suggestions
  if (userMessage.includes("help")) {
    responseMessage = "How can I assist you? Here are some options:";
    suggestions = [
      { question: "What services do you offer?", answer: "We provide web development, app development, and more." },
      { question: "What are your hours?", answer: "Our office hours are Monday to Friday, 9 AM to 5 PM." },
    ];
  } else if (userMessage.includes("services")) {
    responseMessage = "Can you specify what you need help with? Here are some related options:";
    suggestions = [
      { question: "Can you explain more about web development?", answer: "Sure! We specialize in building robust web applications." },
      { question: "Do you offer app development?", answer: "Yes, we develop apps for iOS and Android platforms." },
    ];
  } else if (userMessage.includes("main menu")) {
    responseMessage = "You are back to the main menu. Here are the main options:";
    suggestions = mainMenu;
  } else {
    responseMessage = "Here are the main options to help you get started:";
    suggestions = mainMenu;
  }

  // Send response back to the client
  res.json({ message: responseMessage, suggestions });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
