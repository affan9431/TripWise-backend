const chatbotController = require("../controllers/chatbotController");
const express = require("express");

const router = express.Router();

router.post("/chat", chatbotController.chatbotResponse);

module.exports = router;