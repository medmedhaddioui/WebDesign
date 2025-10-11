import Fastify from 'fastify'
// import Database from 'better-sqlite3'
// const Database = require('better-sqlite3');
import routes from './routes.js'

const PORT = 8000
const fastify = Fastify({
    logger: true
})
// const db = new Database('db');

await fastify.register(routes)

const start = async () => {
    try {
        await fastify.listen({port: PORT})
    }
    catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start ()