const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { exec } = require('child_process');
const fs = require('fs');
const now = new Date();

const client = new Client();

client.on('qr', qr => qrcode.generate(qr, { small: true }));

client.on('ready', () => {
    console.log(`[${now}] Bot está pronto!`);
});

client.on('message', async message => {
    // Ex: !tabela 123
    if (message.body.startsWith('!tabela')) {
        const partes = message.body.split(' ');
        const loja = partes[1];

        if (!loja) {
            message.reply('Informe o código da loja. Ex: !tabela 123');
            return;
        }

        message.reply(`Gerando relatório da loja ${loja}...`);

        exec(`python relatorios/gerar_tabela.py ${loja}`, async (err, stdout, stderr) => {
            if (err) {
                console.error(stderr);
                message.reply('Erro ao gerar relatório ❌');
                return;
            }

            const caminho = stdout.toString().trim();

            if (!fs.existsSync(caminho)) {
                message.reply('Relatório não encontrado 😕');
                return;
            }

            const media = MessageMedia.fromFilePath(caminho);
            await client.sendMessage(message.from, media, {
                caption: `Relatório da loja ${loja} 📊`
            });
        });
    }
});

client.initialize();