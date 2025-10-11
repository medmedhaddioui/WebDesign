import Fastify from 'fastify';
import Plugin from './route.js';

const PORT = 8000;
const fastify = Fastify ({
    logger: true    
})

fastify.register(Plugin)

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