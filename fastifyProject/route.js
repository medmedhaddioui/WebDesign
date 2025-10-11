async function Plugin (fastify, options) {
fastify.get('/Home',  (req, res) => {
    return {message: 'hello Plugin is Home1'}
});

fastify.route({
    method: 'GET',
    url: '/Lobby/:name',
    schema: {
        params: {
            properties :
            {
                brother: {type: 'string'}
            },
            required:['name']
        },
        response: {
            200: {
                properties: 
                {
                    message: {type : 'string'}
                },
                required: ['message']
            }
        }
    },
    handler: (req, res) => {
        return {
            message: `Hello my ${req.params.name}`
        };
    }
});
}
export default Plugin
