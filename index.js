const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const now = new Date();

const client = new Client();

client.on('qr', qr => qrcode.generate(qr, { small: true }));

client.on('ready', () => {
    console.log(`[${now}] Bot está pronto!`);
});

client.on('message', async message => {
    const partes = message.body.split(' ');
    const comando = partes[0];
    const loja = partes[1];

    if (!['!tabela', '!pendentes'].includes(comando)) return;

    if (!loja) {
        message.reply(`Informe o código da loja. Ex: ${comando} 123`);
        return;
    }

    message.reply(`Gerando relatório da loja ${loja}...`);

    let script = '';
    if (comando === '!tabela') {
        script = 'relatorios/gerar_tabela.py';
        relatorio = 'Tabela';
    } else if (comando === '!pendentes') {
        script = 'relatorios/suspeitos_pendentes.py';
        relatorio = 'Suspeitos pendentes';
    }

    exec(`python ${script} ${loja}`,
        { cwd: path.resolve(__dirname), encoding: 'utf-8' },
        async (err, stdout, stderr) => {

        console.log('\n--- PYTHON STDOUT ---');
        console.log(stdout);  // Mostra todos os prints do Python
        
        console.log('\n--- PYTHON STDERR ---');
        console.error(stderr); // Mostra erros/exceções
        
        if (err) {
            console.log('\n--- PYTHON EXIT ERROR ---');
            console.error(err); // Exibe erro do exec
            return;
        }
        
        console.log('\n--- FINAL: Tudo executado com sucesso ---');
        
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
            caption: `${relatorio} da loja ${loja} 📊`
        });
    });
});

client.initialize();