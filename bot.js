const TelegramBot = require('node-telegram-bot-api');
const { addEvent } = require('./calendar');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Iniciar el bot
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "¡Hola! Usa /agregar + [Nombre del evento] el dd/mm/yyyy a las hh:mm para añadir un evento al calendario.");
});

// Agregar evento al calendario
bot.onText(/\/agregar (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const eventDetails = match[1]; 
    addEvent(eventDetails, chatId, bot);
});

module.exports = { bot };
