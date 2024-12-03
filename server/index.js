const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Main menu options
const mainMenu = [
  { question: "Hi", answer: "Hello! How can I assist you today?" },
  { question: "Help", answer: "Here are some options to help you:" },
  { question: "Thank you", answer: "You're welcome! Let me know if you need anything else." },
];

// Help menu options
const helpMenu = [
  { question: "How can I create an account?", answer: "You can create an account by signing up on our website. You'll need your apartment details to register." },
  { question: "I forgot my password, what should I do?", answer: "Click on the 'Forgot Password' link on the login page, and we'll guide you through the recovery process." },
  { question: "How do I file a complaint?", answer: "To file a complaint, go to the 'Complaints' section, fill out the form with your issue details, and submit it. We will review it and get back to you." },
  { question: "Can I file an anonymous complaint?", answer: "Yes, we allow anonymous complaints if you prefer not to share your identity. Just check the 'anonymous' option when filing a complaint." },
  { question: "How do I track a parcel?", answer: "You can track your parcels by visiting the 'Parcels' section. Simply enter the tracking number and you'll see its status." },
  { question: "How can I view the latest community announcements?", answer: "You can view the latest announcements on the 'Announcements' page. We'll also notify you through email or app notifications." },
  { question: "How can I connect with other residents in my building?", answer: "You can join the community chat where you can interact with other residents and stay updated on local happenings." },
  { question: "Thank you", answer: "You're welcome! Let me know if you need anything else." },
];

// Handle chat messages
app.post("/chat", (req, res) => {
  const userMessage = req.body.message;

  let responseMessage = "Sorry, I didn't understand that. Please select an option.";
  let suggestions = [];

  // Handle main menu inputs
  const mainOption = mainMenu.find((option) => option.question.toLowerCase() === userMessage.toLowerCase());
  if (mainOption) {
    responseMessage = mainOption.answer;

    // Show help menu options if user selects "Help"
    if (userMessage.toLowerCase() === "help") {
      suggestions = helpMenu;
    }
  }

  // Handle help menu inputs
  const helpOption = helpMenu.find((option) => option.question.toLowerCase() === userMessage.toLowerCase());
  if (helpOption) {
    responseMessage = helpOption.answer;
  }

  // Default to main menu options if no match is found
  if (!mainOption && !helpOption) {
    suggestions = mainMenu;
  }

  // Send response back to the client
  res.json({ message: responseMessage, suggestions });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
