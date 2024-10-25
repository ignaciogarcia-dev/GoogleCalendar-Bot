const express = require('express');
const { bot } = require('./bot');
const { oauth2Client } = require('./calendar');
const { getAuthUrl, getToken } = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Autenticación
app.get('/auth/google', (req, res) => {
    const authUrl = getAuthUrl();
    res.redirect(authUrl);
});

// Callback
app.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;
    try {
        const tokens = await getToken(code);
        res.send('Autenticación exitosa! Puedes cerrar esta ventana.');
    } catch (error) {
        console.error('Error al obtener tokens:', error);
        res.send('Error en la autenticación.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
