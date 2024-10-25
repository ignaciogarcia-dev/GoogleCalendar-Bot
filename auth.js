const { oauth2Client } = require('./calendar');

// Función para obtener el URL de autenticación
const getAuthUrl = () => {
    return oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar'],
    });
};

// Función para obtener tokens
const getToken = async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
};

module.exports = { getAuthUrl, getToken };
