// import Fastify from 'fastify';
// // import routes from './routes.js';
// import WebSocket from '@fastify/websocket';

// const PORT = 8000;
// const fastify = Fastify({
//     logger: true
// })

// await fastify.register(WebSocket, {
//     options : {
//         maxPayload: 120
//     }
// });

//  function func ()
// {
//     console.log('hello world');
// }
//  func ();
// // await fastify.register(routes);

// // fastify.addHook('preValidation', async (req, res) => {
// //     if (!req.query.playerID)
// //         return res.code(403).send({message : 'Invalid Input'});
// // })
// // fastify.get ('/non-ws', (req, res) => {
// //     res.send ({message: 'Without ws'});
// // });
// // fastify.get('/*', { websocket: true }, (connection, req) => {
// //     connection.on ('message', () => {
        
// //         connection.send('hello form anywhere');
// //         console.log('here');
// //     })
// // });
// // fastify.route({
// //     url: '/ws',
// //     method: 'GET',
// //     handler: (req,res) => {
// //         res.send('HELLOW NORMAL');
// //     },
// //     wsHandler: (connection, req) => {
// //         connection.on('message', nn => {
// //             connection.send('hello route ws')
// //         })
// //     }
    
// // })
// // fastify.get('/ws-hello', {websocket: true}, (connection, req) => {
// //     let timer = setInterval(() => {
// //         connection.send('Hello from Websocket');
// //     }, 1000);
// //     connection.on ('close', close => {
// //         console.log('Client Disconnected');
// //     })
// // })


// const start = async () => {
//     try {
//         await fastify.listen({port: PORT})
//     }
//     catch (err) {
//         fastify.log.error(err)
//         process.exit(1)
//     }
// }
// start ()