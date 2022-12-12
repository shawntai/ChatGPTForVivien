import { ChatGPTAPI } from 'chatgpt'
require("dotenv").config();

const initChatGPT = async () => {
	const api = new ChatGPTAPI({
		sessionToken: process.env.ChatGPT_SESSION_TOKEN,
		clearanceToken: process.env.ChatGPT_CF_CLEARANCE_TOKEN,
	});
	await api.ensureAuth();
};

const sendChatGPTRequest = async (message) => {
	const response = await api.sendMessage(message);
	return response;
};

module.exports = { initChatGPT, sendChatGPTRequest };
