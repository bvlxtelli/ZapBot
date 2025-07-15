const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const client = new Client();

function formatDate(date) {
    const pad = (n) => n.toString().padStart(2, '0');
  
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // meses vão de 0 a 11
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

const agora = new Date();
const now = formatDate(agora);

client.on('qr', qr => qrcode.generate(qr, { small: true }));

client.on('ready', () => {
    console.log(`[${now}] Bot está pronto!`);
});

client.on('message', async message => {
    const partes = message.body.trim().split(/\s+/); // remove espaços extras
    const comando = partes[0];
    const loja = partes[1];

    if (['!tabela', '!pendentes'].includes(comando)) {
        if (!loja) {
            message.reply(`Informe o código da loja. Ex: ${comando} 123`);
            return;
        }

        message.reply(`Gerando relatório da loja ${loja}... 🕑`);

        let script = '';
        let relatorio = '';

        if (comando === '!tabela') {
            script = 'relatorios/gerar_tabela.py';
            relatorio = 'Tabela';
        } else if (comando === '!pendencias') {
            script = 'relatorios/pendencias.py';
            relatorio = 'Suspeitos pendentes';
        }

        exec(`python ${script} ${loja}`,
            { cwd: path.resolve(__dirname), encoding: 'utf-8' },
            async (err, stdout, stderr) => {
                console.log('\n--- PYTHON STDOUT ---');
                console.log(stdout);
                console.log('\n--- PYTHON STDERR ---');
                console.error(stderr);

                if (err) {
                    console.log('\n--- PYTHON EXIT ERROR ---');
                    console.error(err);
                    message.reply('Erro ao gerar relatório ❌');
                    return;
                }

                console.log('\n--- FINAL: Tudo executado com sucesso ---');

                const linhas = stdout.toString().trim().split('\n');
                const caminho = linhas[linhas.length - 1].trim();

                if (!fs.existsSync(caminho)) {
                    message.reply('Relatório não encontrado 😕');
                    return;
                }

                const media = MessageMedia.fromFilePath(caminho);
                await client.sendMessage(message.from, media, {
                    caption: `${relatorio} da loja ${loja} 📊`
                });
            });

    } else if (comando.startsWith('!')) {
        // Tentativa de sugestão com base em erros comuns
        let sugestao = '';
        if (comando.includes('tabel')) sugestao = '!tabela';
        else if (comando.includes('pend')) sugestao = '!pendencias';

        let resposta = `Comando não reconhecido ❌\n`;
        resposta += sugestao ? `Você quis dizer *${sugestao}*? 🤔` :
        `\nComandos disponíveis:\n
        \n*!pendencias (loja)* - Extrai as pendencias da loja citada.
        \n*!tabela (loja)* - Gera a tabela da loja citada.`;

        message.reply(resposta);
    }
});

client.initialize();