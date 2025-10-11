
window.onload = () =>
{

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.background = '#0f1923';
    canvas.height = 400;
    canvas.width = 800;

    class Player {
        constructor (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.score = 0;
        }
    }
    const PADDLE_SPEED = 5;
    const player1 = new Player(10, (canvas.height / 2) - 50, 15, 100);
    const player2 = new Player(canvas.width - 25, (canvas.height / 2) - 50, 15, 100);
    const keys = {};

    document.addEventListener('keydown', (event) => {
        keys[event.key] = true;
    });
    document.addEventListener('keyup', (event) => {
        keys[event.key] = false;
    });

    function updatePaddles() {
        if (keys.w) player1.y -= PADDLE_SPEED;
        if (keys.s) player1.y += PADDLE_SPEED;
        if (keys.ArrowUp) player2.y -= PADDLE_SPEED;
        if (keys.ArrowDown) player2.y += PADDLE_SPEED;
    }

    function outOfBounds(player) {
        if (player.y < 0) player.y = 0;
        if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
    }

    function DrawPaddle() {
        updatePaddles();
        outOfBounds(player1);
        outOfBounds(player2);
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.rect(player1.x, player1.y, player1.width , player1.height);
        ctx.rect(player2.x, player2.y, player2.width , player2.height);
        ctx.fill();
    }

    // Ball stats
    const BALL_RADIUS = 15;
    const BASE_SPEED_X = 5;
    const BASE_SPEED_Y = 4;
    const WINNING_SCORE = 3;
    let gameover = '';

    let SpeedX = BASE_SPEED_X;
    let SpeedY = BASE_SPEED_Y;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;

    function checkHitCorner() {
        if ((ballX - BALL_RADIUS) < 0)
            return 2;
        if ((ballX + BALL_RADIUS) > canvas.width)
            return 1;
        return 0;
    }

    function DrawBall() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2 , false);
        ctx.fillStyle = '#ece8e1';
        ctx.shadowColor = 'rgba(236, 232, 225, 0.8)';
        ctx.shadowBlur = 25;
        ctx.fill();
        ctx.restore();
    }

    function checkCollision(player) {
        let closeX = ballX;
        let closeY = ballY;
        
        if (ballX > player.x + player.width)
            closeX = player.x + player.width;
        else if (ballX < player.x)
            closeX = player.x;

        if (ballY > player.y + player.height)
            closeY = player.y + player.height;
        else if (ballY < player.y)
            closeY = player.y;
            
        let DisX = closeX - ballX;
        let DisY = closeY - ballY;
        let distance = Math.sqrt((DisX * DisX) + (DisY * DisY));
        return distance <= BALL_RADIUS;
    }

    function ResetBall() {
        SpeedX = 0;
        SpeedY = 0;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        DrawBall();
        setTimeout(() => {
            SpeedX = BASE_SPEED_X * (Math.random() > 0.5 ? 1 : -1);
            SpeedY = BASE_SPEED_Y * (Math.random() > 0.5 ? 1 : -1);
        }, 1000);
    }

    function UpdateBall() {
        const score = checkHitCorner();
        if (score !== 0) {
            if (score === 1)    player1.score += 1;
            else if (score === 2)   player2.score++;

            if (player1.score == WINNING_SCORE)
                gameover = "PLAYER 1 WIN";
            else if (player2.score === WINNING_SCORE)
                gameover = "PLAYER 2 WIN"
            ResetBall();
            return ;
        }
        if (checkCollision(player1)) {
            SpeedX = Math.abs(SpeedX) * 1.05;
            SpeedY *= 1.05;
            console.log("collision happed")
            ballX = player1.x + player1.width + BALL_RADIUS; 
        }
        else if (checkCollision(player2)) {
            SpeedX = -Math.abs(SpeedX) * 1.05;
            SpeedY *= 1.05;
            ballX = player2.x - BALL_RADIUS; 
        }
        if ((ballY + BALL_RADIUS) > canvas.height || (ballY - BALL_RADIUS) < 0)
            SpeedY *= -1;
        ballX += SpeedX;
        ballY += SpeedY;
        DrawBall();
    }

    function DrawScore() {
        ctx.fillStyle = '#ece8e1';
        ctx.font = '32px Arial';
        ctx.fillText(player1.score, canvas.width / 4, 50);
        ctx.fillText(player2.score, (canvas.width / 4) * 3, 50);
    }

    function isWinner() {
        ctx.fillStyle = '#ece8e1';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${gameover} Wins!`, canvas.width / 2, canvas.height / 2);
        ctx.font = '24px Arial';
        ctx.fillText('Refresh to play again', canvas.width / 2, canvas.height / 2 + 50);
        ctx.textAlign = 'left';
        
    }

    function gameLoop() {
        ctx.clearRect(0, 0,canvas.width, canvas.height);
        if (gameover)
        {
            isWinner();
            return; 
        }

        DrawPaddle();
        UpdateBall();
        DrawScore();
        window.requestAnimationFrame(gameLoop);
    }
    gameLoop();
}
// DrawCenter ();