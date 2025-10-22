
  // function DrawScore() {
  //         ctx.fillStyle = '#ece8e1';
  //         ctx.font = '32px Arial';
  //         ctx.fillText(player1.score, canvas.width / 4, 50);
  //         ctx.fillText(player2.score, (canvas.width / 4) * 3, 50);
  // }

  // function DrawBall() {
  //         ctx.save();
  //         ctx.beginPath();
  //         ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI * 2 , false);
  //         ctx.fillStyle = '#ece8e1';
  //         ctx.shadowColor = 'rgba(236, 232, 225, 0.8)';
  //         ctx.shadowBlur = 25;
  //         ctx.fill();
  //         ctx.restore();
  // }

  // function isWinner() {
  //     ctx.fillStyle = '#ece8e1';
  //     ctx.font = '48px Arial';
  //     ctx.textAlign = 'center';
  //     ctx.fillText(`${gameover} Wins!`, canvas.width / 2, canvas.height / 2);
  //     ctx.font = '24px Arial';
  //     ctx.fillText('Refresh to play again', canvas.width / 2, canvas.height / 2 + 50);
  //     ctx.textAlign = 'left';
  // }



const loginPage = document.getElementById("login-page");
const userElement = document.getElementById('userID');
const getUsers = document.getElementById('DisplayPlayers');
const playButton = document.getElementById('play-button');
const URL = 'http://localhost:8000/api';
let currentPlayer = null;

userElement.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const content = e.target.value;
    currentPlayer = content;
    console.log('Success filling user');
  }
});

getUsers.addEventListener('click', async (e) => {
    e.preventDefault();
    const response = await fetch (URL);
    try {
      if (!response.ok)
        throw new Error ('Error in response GET');
      const data = await response.json();
      const playersList = document.querySelector('ul');
      playersList.innerHTML = '';

      data.forEach((player) => {
          const addPlayer = document.createElement('li');
          addPlayer.textContent = `${player.playerName}`;
          const InviteButton = document.createElement('button');
          InviteButton.textContent =  'Add Invite';
          InviteButton.className = `
            text-red-500 hover:text-red-400 p-1 
            rounded transition-colors duration-200
            flex items-center justify-center
            `;
          addPlayer.className =
          'py-2 px-4 mb-2 bg-black/30 border border-red-600/30 rounded-lg text-white hover:bg-red-800/40 transition-colors duration-300';
          playersList.appendChild(addPlayer);
          addPlayer.appendChild(InviteButton);
    });
    }
    catch (err) {
         console.error (err);
    }
})


function gameRendring(message) {


  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.style.background = '#0f1923';
  canvas.height = 400;
  canvas.width = 800;
  function DrawPaddle(player1) {
      ctx.beginPath();
      ctx.fillStyle = 'red';
      ctx.rect(player1.x, player1.y, player1.width , player1.height);
      // ctx.rect(player2.x, player2.y, player2.width , player2.height);
      ctx.fill();
  }
  function gameLoop() {
  ctx.clearRect(0, 0,canvas.width, canvas.height);
      // if (gameover)
      // {
      //     isWinner();
      //     return;
      // }
      DrawPaddle(message.playerStats);
      // UpdateBall();
      // DrawScore();
      console.log('here');
      window.requestAnimationFrame(gameLoop);
  }
  gameLoop();
}

function handleServerMessage (message, ws) {
    if (message.type === 'PLAYER_JOINED') {
        console.log('here');
    }
        // gameRendring(message);
    else (message.type === 'GAME_STARTED')
        return ;
}

function connectToGameServer() {
    const ws = new WebSocket('ws://localhost:8000/game');
    ws.onopen = () => {
      console.log('Connected !');
      ws.send(JSON.stringify({
          type: 'JOIN_GAME',
          playerName: currentPlayer
      }));
    }
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data); 
      console.log(message); 
      handleServerMessage(message);
    }
    ws.onclose =  () => {
      console.log('Closed connection')
    }
}
playButton.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!currentPlayer)
      return ;
    const response = await fetch(URL + '/initPlayer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({playerName: currentPlayer}),
    });
    try {
        if (!response.ok)
            throw new Error('Error in response POST');
        const data = await  response.json();
        console.log(data);// data player
    }
    catch (err)
    {
      console.error(err);
    }
    const game = document.getElementById('gameCanvas');
    game.classList.remove('hidden');
    loginPage.style.display = "none";
    connectToGameServer();
})