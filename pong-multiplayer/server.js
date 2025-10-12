import Fastify from 'fastify'
import routes from './routes.js'
import sqliteDB from './sqlite.js'

const PORT = 8000
const fastify = Fastify({
    logger: true
})

await fastify.register(sqliteDB)// read
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