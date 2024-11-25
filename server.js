const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('Client connected');
    
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        
        // Broadcast the message as plain text
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString()); // Ensure message is sent as a string
            }
        });
    });

    ws.on('close', () => console.log('Client disconnected'));
});

