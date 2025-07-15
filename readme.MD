
# 📧 **ZapBot** - *Report Automation via WhatsApp*

## Overview

This project is a **WhatsApp** bot that automates the generation and sending of specific reports for each store in a chain, through simple commands directly on **WhatsApp**. The solution integrates **Node.js** and **Python** to offer speed, convenience, and greater autonomy to managers, facilitating real-time decision making.

## Challenge

- Reduce the time and complexity of obtaining store-specific reports.
- Eliminate manual processes and multiple accesses to different systems.
- Use a communication channel already widely adopted by the team: **WhatsApp**.

## Solution

- WhatsApp bot developed with [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js) that responds to chat commands.
- Dynamic execution of Python scripts to generate reports on demand, using the store code as a parameter.
- Automatic sending of the generated files to the user via WhatsApp.
- Instant feedback on process status, errors, and command suggestions.

## Technologies Used

| Technology           | Role in the Project                          |
|----------------------|---------------------------------------------|
| **Node.js**          | Platform for WhatsApp bot and orchestration |
| **whatsapp-web.js**  | API for WhatsApp Web integration             |
| **Python**           | Generation of personalized reports           |
| **child_process**    | Execution of Python scripts via Node.js      |
| **qrcode-terminal**  | QR code display for bot authentication       |

## Impact and Results

- **Speed**: Reports accessed in minutes via WhatsApp, no additional systems needed.
- **Autonomy**: Managers get data directly, simplifying internal processes.
- **Error Reduction**: Automation decreases rework and common manual process errors.
- **Scalability**: Easy inclusion of new report types and commands.

## Persistent Authentication

The bot uses the `LocalAuth` feature from the `whatsapp-web.js` library, which keeps the session active even after restarts.

```js
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: 'ZapBot'
    })
});
```

## How to Use

### Initial Steps

1. Clone the repository.
2. Install dependencies with `npm install`.
3. Have Python installed and Python scripts ready in the `relatorios/` folder.
4. Run the bot with `node index.js`.
5. Scan the displayed QR code to authenticate your WhatsApp Web.

## Available Commands

| Command                         | Description                            | Example          |
|---------------------------------|--------------------------------------|------------------|
| **!tabela** <store_code>         | Generates and sends the store table  | !tabela 123      |
| **!pendencias** <store_code>     | Generates the store's pending report | !pendencias 123  |

### Project Structure
```bash
.
├── index.js             # Main WhatsApp bot code
├── relatorios/          # Python scripts for report generation
│   ├── gerar_tabela.py
│   └── pendencias.py
├── package.json
└── README.md
```

### Notes

- The **Python** scripts must print the generated file path at the end so the bot can locate and send the file.
- A properly configured environment with **Node.js** and **Python** is essential for operation.

### Contact

For questions, suggestions, or improvements, open an issue or send a message.
