const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const botToken = 'YOUR_TELEGRAM_BOT_TOKEN';
const shrinkMeApiToken = '7319222b2eba082e2b90474b58064cfe57f12edf';
const channelLink = 'https://t.me/techxbots';

// Create a bot instance
const bot = new TelegramBot(botToken, { polling: true });

// Command to start the bot
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Welcome! Send me a URL and I will shorten it for you.\n\nPlease also join our channel for updates: ${channelLink}`);
});

// Handle incoming messages
bot.onText(/^https?:\/\/.*/, (msg) => {
  const chatId = msg.chat.id;
  const url = msg.text;

  // Shorten the URL using ShrinkMe API
  axios.get(`https://shrinkme.io/api?api=${shrinkMeApiToken}&url=${encodeURIComponent(url)}`)
    .then((response) => {
      const shortenedUrl = response.data.shortenedUrl;
      bot.sendMessage(chatId, ` ${shortenedUrl}`);
    })
    .catch((error) => {
      console.error(error);
      bot.sendMessage(chatId, 'Sorry, an error occurred while shortening the URL.');
    });
});

