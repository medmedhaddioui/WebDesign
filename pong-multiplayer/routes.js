import fastifyStatic from '@fastify/static'
import { join } from 'path'

async function routes (fastify)
{
    fastify.get('/', async (request, reply) => {
        return {hello: 'world'}
    })

    fastify.register(fastifyStatic, {
        root: join(process.cwd(), 'PingPong'),
        prefix: '/game/',
        index: ['index.html']
    })
}
export default routes