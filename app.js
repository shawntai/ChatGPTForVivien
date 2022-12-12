import express from 'express';
import { ChatGPTAPI } from 'chatgpt'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config();
// import { initChatGPT, sendChatGPTRequest } from './ChatGPTUtils.js';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to ChatGPT for Vivien');
});

app.get('/chatgpt', (req, res) => {
  res.send('Welcome to ChatGPT');
});

app.post('/chatgpt', async (req, res) => {
  console.log(req.body);
  const response = await sendChatGPTRequest(req.body.message);
  res.send({response});
});

let api;

const initChatGPT = async () => {
  // console.log(process.env.ChatGPT_SESSION_TOKEN);
  api = new ChatGPTAPI({
		sessionToken: process.env.ChatGPT_SESSION_TOKEN,
    clearanceToken: process.env.ChatGPT_CF_CLEARANCE_TOKEN,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
	});
	await api.ensureAuth();
};

const sendChatGPTRequest = async (message) => {
	const response = await api.sendMessage(message);
	return response;
};

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    await initChatGPT();
    console.log('ChatGPT initialized');
    // const response = await sendChatGPTRequest('Explain quantum computing in simple terms');
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
};

start();
