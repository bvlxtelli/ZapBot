# 📧 **ZapBot** - *Automação de Relatórios via WhatsApp*

## Visão Geral

Este projeto é um bot WhatsApp que automatiza a geração e envio de relatórios específicos para cada loja de uma rede, através de comandos simples no próprio WhatsApp. A solução integra Node.js e Python para oferecer agilidade, praticidade e maior autonomia aos gestores, facilitando a tomada de decisões em tempo real.

---

## Desafio

- Reduzir o tempo e complexidade na obtenção de relatórios por loja.
- Eliminar processos manuais e múltiplos acessos a sistemas distintos.
- Utilizar um canal de comunicação já amplamente adotado pela equipe: o WhatsApp.

---

## Solução

- Bot WhatsApp desenvolvido com [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) que responde a comandos no chat.
- Execução dinâmica de scripts Python para gerar relatórios sob demanda, utilizando o código da loja como parâmetro.
- Envio automático dos arquivos gerados para o usuário via WhatsApp.
- Feedback instantâneo sobre status do processo, erros e sugestões de comandos.

---

## Tecnologias Utilizadas

| Tecnologia           | Papel no Projeto                                |
|----------------------|-------------------------------------------------|
| **Node.js**          | Plataforma para bot WhatsApp e orquestração     |
| **whatsapp-web.js**  | API para integração com WhatsApp Web            |
| **Python**           | Geração dos relatórios personalizados           |
| **child_process**    | Execução dos scripts Python via Node.js         |
| **qrcode-terminal**  | Exibição do QR code para autenticação do bot    |

---

## Impacto e Resultados

- **Agilidade**: Relatórios acessados em minutos via WhatsApp, sem necessidade de sistemas adicionais.
- **Autonomia**: Gestores obtêm dados diretamente, simplificando processos internos.
- **Redução de Erros**: Automação diminui retrabalho e falhas comuns em processos manuais.
- **Escalabilidade**: Fácil inclusão de novos tipos de relatórios e comandos.

---

## Como Usar

### Passos iniciais

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Tenha Python instalado e scripts Python prontos na pasta `relatorios/`.
4. Execute o bot com `node index.js`
5. Escaneie o QR code exibido para autenticar seu WhatsApp Web.

---

## Comandos disponíveis

|   Comando                         |	Descrição	                            |   Exemplo         |
|-----------------------------------|-------------------------------------------|-------------------|
|   **!tabela** <codigo_loja>	    |   Gera e envia a tabela da loja	        |   !tabela 123     |
|   **!pendencias** <codigo_loja>	|   Gera relatório de pendências da loja	|   !pendencias 123 |

---

### Estrutura do Projeto
```bash
.
├── index.js             # Código principal do bot WhatsApp
├── relatorios/          # Scripts Python para geração dos relatórios
│   ├── gerar_tabela.py
│   └── pendencias.py
├── package.json
└── README.md
```

---

### Observações

- Os scripts Python devem imprimir no final o caminho do arquivo gerado para que o bot possa localizar e enviar o arquivo.
- Ambiente com Node.js e Python configurados corretamente é fundamental para o funcionamento.

### Contato

Para dúvidas, sugestões ou melhorias, abra uma issue ou envie uma mensagem.
