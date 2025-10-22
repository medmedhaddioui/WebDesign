
// const player2 = new Player(canvas.width - 25, (canvas.height / 2) - 50, 15, 100);
    // const keys = {};

    // function updatePaddles() {
    //     if (keys.w) player1.y -= PADDLE_SPEED;
    //     if (keys.s) player1.y += PADDLE_SPEED;
    //     if (keys.ArrowUp) player2.y -= PADDLE_SPEED;
    //     if (keys.ArrowDown) player2.y += PADDLE_SPEED;
    // }

    // function outOfBounds(player) {
    //     if (player.y < 0) player.y = 0;
    //     if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
    // }



    // // Ball stats
    // const BALL_RADIUS = 15;
    // const BASE_SPEED_X = 5;
    // const BASE_SPEED_Y = 4;
    // const WINNING_SCORE = 3;
    // let gameover = '';

    // let SpeedX = BASE_SPEED_X;
    // let SpeedY = BASE_SPEED_Y;
    // let ballX = canvas.width / 2;
    // let ballY = canvas.height / 2;

    // function checkHitCorner() {
    //     if ((ballX - BALL_RADIUS) < 0)
    //         return 2;
    //     if ((ballX + BALL_RADIUS) > canvas.width)
    //         return 1;
    //     return 0;
    // }


    // function checkCollision(player) {
    //     let closeX = ballX;
    //     let closeY = ballY;
        
    //     if (ballX > player.x + player.width)
    //         closeX = player.x + player.width;
    //     else if (ballX < player.x)
    //         closeX = player.x;

    //     if (ballY > player.y + player.height)
    //         closeY = player.y + player.height;
    //     else if (ballY < player.y)
    //         closeY = player.y;
            
    //     let DisX = closeX - ballX;
    //     let DisY = closeY - ballY;
    //     let distance = Math.sqrt((DisX * DisX) + (DisY * DisY));
    //     return distance <= BALL_RADIUS;
    // }

    // function ResetBall() {
    //     SpeedX = 0;
    //     SpeedY = 0;
    //     ballX = canvas.width / 2;
    //     ballY = canvas.height / 2;
    //     DrawBall();
    //     setTimeout(() => {
    //         SpeedX = BASE_SPEED_X * (Math.random() > 0.5 ? 1 : -1);
    //         SpeedY = BASE_SPEED_Y * (Math.random() > 0.5 ? 1 : -1);
    //     }, 1000);
    // }

    // function UpdateBall() {
    //     const score = checkHitCorner();
    //     if (score !== 0) {
    //         if (score === 1)    player1.score += 1;
    //         else if (score === 2)   player2.score++;

    //         if (player1.score == WINNING_SCORE)
    //             gameover = "PLAYER 1 WIN";
    //         else if (player2.score === WINNING_SCORE)
    //             gameover = "PLAYER 2 WIN"
    //         ResetBall();
    //         return ;
    //     }
    //     if (checkCollision(player1)) {
    //         SpeedX = Math.abs(SpeedX) * 1.05;
    //         SpeedY *= 1.05;
    //         console.log("collision happed")
    //         ballX = player1.x + player1.width + BALL_RADIUS; 
    //     }
    //     else if (checkCollision(player2)) {
    //         SpeedX = -Math.abs(SpeedX) * 1.05;
    //         SpeedY *= 1.05;
    //         ballX = player2.x - BALL_RADIUS; 
    //     }
    //     if ((ballY + BALL_RADIUS) > canvas.height || (ballY - BALL_RADIUS) < 0)
    //         SpeedY *= -1;
    //     ballX += SpeedX;
    //     ballY += SpeedY;
    //     DrawBall();
    // }








    

import Fastify from 'fastify';
import routes from './routes.js';
import WebSocket from '@fastify/websocket';
import cors from "@fastify/cors";

const PORT = 8000;
const fastify = Fastify({
    logger: true
})
await fastify.register(cors, {
  origin: true, 
});
await fastify.register(WebSocket);
await fastify.register(routes);

const start = async () => {
    try {
        const address = await fastify.listen({ port: PORT });
        console.log(`Server running at ${address}`);
    }
    catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start ()

