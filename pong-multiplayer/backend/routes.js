import fastifyStatic from '@fastify/static'
import { join } from 'path'
import db from './sqlite.js'

async function routes (fastify)
{
    fastify.get('/api',  (req, res) => {
        res.header('Content-Type', 'application/json');
        const sql = 'SELECT * FROM players';
        db.all (sql, [], (err, rows) => {
            if (err) {
               console.error(err);
                return res.status(500).send({ error: 'Internal Server Error' });
            }
            console.log(rows.playerName)
            res.send(rows);
        })
    });

    fastify.post('/api/initPlayer', (req, res) => {
        const {playerName} = req.body; // destructing
        console.log(playerName);
        const sql = 'INSERT INTO players(playerName) VALUES (?)';
        db.run(sql, [playerName], (err) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ 
                error: 'Failed to insert player' 
            });
        }
            res.status(200).send({message: 'Success Insertion Database'});
        });
    });
    const clients = new Set();
    const canvasHeight = 400; // edit canvas height / width
    const canvasWidth = 800;
    fastify.get('/game', {websocket: true}, (connection, req) => {
       clients.add(connection);
       connection.on ('message', (message) => {
        const msg = JSON.parse(message.toString());
        if (msg.type === 'JOIN_GAME') {
            if (clients.size === 1) {
                const player1 = {
                    x: 10,
                    y:  (canvasHeight / 2) - 50,
                    width: 15,
                    height:100,
                    paddleSpeed: 5,
                    score: 0
                }
                const reply = {
                    playerStats: player1,
                    type: 'PLAYER_JOINED'
                }
                connection.send(JSON.stringify(reply));
            }
            else
            { 
                const reply = {
                    playerStats: null,
                    type: 'GAME_STARTED'
                }
                connection.send(JSON.stringify(reply));
            }
                
        }
            });
       })
}

export default routes































    // fastify.delete ('/api', (req, res) => {
    //     const sql = 'DELETE FROM players WHERE player_id=?';
    //     db.run (sql, [req.query.player_id], function(err)
    //     {
    //         if (err) {
    //            console.error(err);
    //             return res.status(500).send({ error: 'Internal Server Error' });
    //         }
    //         else
    //         {
    //            if (this.changes === 0) {
    //             res.send("No player found with that ID.");
    //             } 
    //             else {
    //                 res.send(`Deleted player with ID ${req.query.player_id}`);
    //             }
    //         }
    //     })

    // })

    // fastify.register(fastifyStatic, {
    //     root: join(process.cwd(), 'PingPong'),
    //     prefix: '/game/',
    //     index: ['index.html']
    // })