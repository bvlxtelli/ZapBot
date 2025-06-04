const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Usando autenticação local (salva o login no computador)
const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    // Mostra QR code no terminal para escanear com o WhatsApp
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot está pronto!');
});

client.on('message', message => {
    if (message.body === '!ping') {
        message.reply('pong 🏓');
    }
});

client.initialize();
