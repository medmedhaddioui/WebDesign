import Fastify from 'fastify';
import webSocket from '@fastify/websocket';

// import staticFiles from '@fastify/static'
// import { join, dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// await fastify.register(staticFiles, {
//     root: join(__dirname, '../frontChat'),
//     index: 'index.html',
//     prefix: '/',  
// });

const PORT = 3000;
const fastify = Fastify ({
    logger: true
})

await fastify.register(webSocket);
const clients = new Set();
fastify.get('/chat', { websocket : true }, (connection, req) => {

    clients.add(connection);
    console.log('Client connected. Total:', clients.size);

    connection.on('message',  message  => {
        const messageStr = message.toString();
        console.log('Received:', messageStr);
        clients.forEach((client) => {
            if (client.readyState === 1)
                client.send(messageStr);
        })
    })

    connection.on('close', () => {
        clients.delete(connection);
        console.log('Client disconnected. Total:', clients.size);
    })
})

const start = async () => {
    try { 
        await fastify.listen({port: PORT});
    }
    catch (err)
    {
        fastify.log.error(err);
        process.exit(1);   
    }
}
start();