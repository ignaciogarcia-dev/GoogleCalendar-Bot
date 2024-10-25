const { google } = require('googleapis');
const moment = require('moment-timezone');
require('dotenv').config();

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

// Configurar credenciales
oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// Agregar evento
const addEvent = async (eventDetails, chatId, bot) => {

    const eventRegex = /(.+?) el (\d{1,2})\/(\d{1,2})\/(\d{4}) a las (\d{1,2}):(\d{2})/;
    const matchResult = eventRegex.exec(eventDetails);

    if (!matchResult) {
        bot.sendMessage(chatId, "Formato no válido. Usa: 'Evento el dd/mm/yyyy a las hh:mm'");
        return;
    }

    const eventSummary = matchResult[1].trim();
    const day = matchResult[2];
    const month = matchResult[3];
    const year = matchResult[4];
    const hour = matchResult[5];
    const minutes = matchResult[6];

    // Crear la fecha y hora del evento
    const startTime = moment.tz(`${year}-${month}-${day} ${hour}:${minutes}`, "YYYY-MM-DD HH:mm", 'America/Montevideo');
    const endTime = startTime.clone().add(1, 'hour'); // Duración estándar


    // Crea el evento en Google Calendar
    try {
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        const event = {
            summary: eventSummary,
            start: {
                dateTime: startTime.format(),
                timeZone: 'America/Montevideo',
            },
            end: {
                dateTime: endTime.format(),
                timeZone: 'America/Montevideo',
            },
        };


        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });
        bot.sendMessage(chatId, `Evento agregado: ${response.data.summary} el ${startTime.format('DD/MM/YYYY')} a las ${startTime.format('HH:mm')}`);
    } catch (error) {
        console.error('Error al agregar el evento:', error);
        bot.sendMessage(chatId, 'Hubo un error al agregar el evento.');
    }
};

module.exports = { oauth2Client, addEvent };
