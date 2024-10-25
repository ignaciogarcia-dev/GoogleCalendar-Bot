# Telegram Bot - Google Calendar Event Creator

Este proyecto es un bot de Telegram que permite agregar eventos a Google Calendar mediante simples comandos de texto. Es ideal para automatizar la creación de recordatorios en tu calendario con un mensaje de Telegram.

## Características

- **Agregar eventos**: Agregar eventos a tu Google Calendar con solo enviar un comando en Telegram. 
- **Fácil de usar**: El comando `/agregar` seguido de la descripción del evento en el formato correcto añadirá automáticamente el evento a tu calendario.
- **Integración con Google Calendar**: La autenticación y creación de eventos se gestiona a través de la API de Google Calendar.

## Requisitos previos

Para poder usar este bot, necesitarás lo siguiente:

1. **Cuenta de Google**: Para autenticarte y usar Google Calendar.
2. **Google Cloud Project**: Necesitarás configurar un proyecto en Google Cloud y habilitar la Google Calendar API.
3. **Credenciales OAuth 2.0**: Las credenciales de cliente (Client ID, Client Secret, y Refresh Token) para autenticarte con Google.

## Instalación

### Paso 1: Clonar el repositorio

```bash
git clone https://github.com/ignaciogarcia-dev/GoogleCalendar-Bot.git
cd telegram-google-calendar-bot
```

### Paso 2: Instalar dependencias

Asegúrate de tener [Node.js](https://nodejs.org) instalado y luego ejecuta:

```bash
npm install
```

### Paso 3: Configurar variables de entorno

Crea un archivo `.env` en el directorio raíz con el siguiente contenido, reemplazando los valores con tus propias credenciales:

```env
TELEGRAM_BOT_TOKEN=tu-telegram-bot-token
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
GOOGLE_REDIRECT_URI=tu-google-redirect-uri
GOOGLE_REFRESH_TOKEN=tu-google-refresh-token
```

### Paso 4: Ejecutar el proyecto

Para iniciar el servidor y el bot de Telegram:

```bash
node index.js
```

## Uso

1. **Iniciar el bot**: Abre Telegram y busca tu bot. Usa el comando `/start` para comenzar.
2. **Agregar eventos**: Envia el comando `/agregar` seguido del evento en este formato:

   ```bash
   /agregar Evento el dd/mm/yyyy a las hh:mm
   ```

   Ejemplo:

   ```bash
   /agregar Reunión de trabajo el 25/12/2024 a las 10:00
   ```

   El bot creará el evento en tu Google Calendar con una duración estándar de 1 hora.

## Estructura del proyecto

- **index.js**: Punto de entrada de la aplicación. Maneja la autenticación con Google y la configuración del servidor Express.
- **bot.js**: Contiene la lógica del bot de Telegram, incluida la respuesta a los comandos y el manejo de eventos.
- **calendar.js**: Define las funciones para interactuar con la API de Google Calendar, como la creación de eventos.
- **auth.js**: Contiene funciones de autenticación, como generar URLs de autenticación y gestionar los tokens OAuth.

## Contribuciones

Si deseas contribuir al proyecto, por favor haz un fork del repositorio, realiza tus cambios y abre un pull request.
