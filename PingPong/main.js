window.onload = () =>
{
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.style.background = '#0f1923';
    canvas.height = 400;
    canvas.width = 700;

    class Player {
        constructor (x, y, playerWidth, playerHeight, playerSpeed) {
            this.x = x;
            this.y = y;
            this.playerWidth = playerWidth;
            this.playerHeight = playerHeight;
            this.playerSpeed = playerSpeed;
        }
    }
    const player1 = new Player('10', (canvas.height / 2) - 50, 15, 100, 0);
    const player2 = new Player(canvas.width - 25, (canvas.height / 2) - 50, 15, 100, 0);
    function outOfBounds(movePos) {
        if (movePos < 0  || movePos + player1.playerHeight >= canvas.height )
            return true;
    }
    function DrawPaddle() {
        const KeyUp = document.addEventListener('keydown', (event) =>
        {
            if (event.key == 'ArrowUp')
                player1.playerSpeed = -3; 
            else if (event.key == 'ArrowDown')
                player1.playerSpeed = 3;
            else if (event.key == 'w')
                player2.playerSpeed = -3;
            else if (event.key == 's')
                player2.playerSpeed = 3;
        })
        if (!outOfBounds(player1.y + player1.playerSpeed))
            player1.y += player1.playerSpeed;
        if (!outOfBounds(player2.y + player2.playerSpeed))
            player2.y += player2.playerSpeed;
        ctx.restore();
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.rect(player1.x, player1.y, player1.playerWidth , player1.playerHeight);
        ctx.rect(player2.x, player2.y, player2.playerWidth , player2.playerHeight);
        ctx.fill();

    }

    let SpeedX = -5;
    let SpeedY = 2;
    let ballX =  400;
    let ballY = 200;
    let radius = 15;
    function checkHitCorner() {
        if ((ballX + radius) > canvas.width || (ballX - radius) < 0)
            return true;
    }

    function resetBall() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(ballX, ballY, radius, 0, Math.PI * 2 , false);
        ctx.fillStyle = '#ece8e1';
        ctx.shadowColor = 'rgba(236, 232, 225, 0.8)';
        ctx.shadowBlur = 25;
        ctx.fill();
    }

    function checkCollision() {
        let closeX = ballX;
        let closeY = ballY;
        if (closeX > player1.x + player1.playerWidth)
            closeX = player1.x + player1.playerWidth;
        else if (closeX < player1.x)
            closeX = player1.x;
        else if (closeY > player1.y + player1.playerHeight)
            closeY = player1.y + player1.playerHeight;
        else if (closeY < player1.y)
            closeY = player1.y;
        let DisX = closeX - ballX;
        let DisY = closeY - ballY;
        let distance = Math.sqrt( (DisX*DisX) + (DisY*DisY) );
        return distance;
    }

    function DrawBall() {

        if (checkHitCorner())
        {
            SpeedX = 0;
            SpeedY = 0;
            // ballX = 400;
            // ballY = 200;
            // resetBall();
        }
        if ((ballY + radius) > canvas.height || (ballY - radius) < 0)
            SpeedY = -SpeedY;
        ballX += SpeedX;
        ballY += SpeedY;
        resetBall();
    }

    function gameLoop() {
        ctx.clearRect(0, 0,canvas.width, canvas.height);
        window.requestAnimationFrame(gameLoop);

        DrawPaddle();
        DrawBall();
    }
    gameLoop();
}
