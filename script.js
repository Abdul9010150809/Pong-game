const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

let WIDTH = canvas.width;
let HEIGHT = canvas.height;

const PADDLE_WIDTH = 15;
let PADDLE_HEIGHT = 100;
const PADDLE_MARGIN = 20;
let aiPaddleHeight = PADDLE_HEIGHT;
let PADDLE_SPEED = 8;

const BALL_SIZE = 14;
let ballSpeed = 8;
const BALL_SPEED_INCREMENT = 0.6;
const MAX_SCORE = 10;

let playerScore = 0;
let aiScore = 0;

let playerY = HEIGHT / 2 - PADDLE_HEIGHT / 2;
let aiY = HEIGHT / 2 - PADDLE_HEIGHT / 2;

let ballX = WIDTH / 2 - BALL_SIZE / 2;
let ballY = HEIGHT / 2 - BALL_SIZE / 2;
let ballVX = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
let ballVY = ballSpeed * (Math.random() * 2 - 1);

let upPressed = false;
let downPressed = false;

function resizeCanvas() {
  canvas.width = window.innerWidth * 0.85;
  canvas.height = window.innerHeight * 0.85;
  WIDTH = canvas.width;
  HEIGHT = canvas.height;
  playerY = HEIGHT / 2 - PADDLE_HEIGHT / 2;
  aiY = HEIGHT / 2 - aiPaddleHeight / 2;
  resetBall(ballVX > 0 ? 1 : -1);
}
window.addEventListener("resize", resizeCanvas);

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseY = e.clientY - rect.top;
  playerY += (mouseY - (playerY + PADDLE_HEIGHT / 2)) * 0.3;
  playerY = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, playerY));
});

document.addEventListener("keydown", (e) => {
  if (e.key === "w" || e.key === "ArrowUp") upPressed = true;
  if (e.key === "s" || e.key === "ArrowDown") downPressed = true;
});
document.addEventListener("keyup", (e) => {
  if (e.key === "w" || e.key === "ArrowUp") upPressed = false;
  if (e.key === "s" || e.key === "ArrowDown") downPressed = false;
});

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

function update() {
  if (upPressed) playerY -= PADDLE_SPEED;
  if (downPressed) playerY += PADDLE_SPEED;
  playerY = Math.max(0, Math.min(HEIGHT - PADDLE_HEIGHT, playerY));

  ballX += ballVX;
  ballY += ballVY;

  if (ballY <= 0) {
    ballY = 0;
    ballVY *= -1;
  }
  if (ballY + BALL_SIZE >= HEIGHT) {
    ballY = HEIGHT - BALL_SIZE;
    ballVY *= -1;
  }

  if (
    ballX <= PADDLE_MARGIN + PADDLE_WIDTH &&
    ballY + BALL_SIZE >= playerY &&
    ballY <= playerY + PADDLE_HEIGHT
  ) {
    ballX = PADDLE_MARGIN + PADDLE_WIDTH;
    ballVX *= -1;
    let hitPos = (ballY + BALL_SIZE / 2) - (playerY + PADDLE_HEIGHT / 2);
    ballVY = hitPos * 0.28 + (Math.random() - 0.5) * 2;
    ballSpeed += BALL_SPEED_INCREMENT;
    ballVX = Math.sign(ballVX) * ballSpeed;
    ballVY = Math.sign(ballVY) * Math.min(Math.abs(ballVY), ballSpeed * 2);
  }

  if (
    ballX + BALL_SIZE >= WIDTH - PADDLE_MARGIN - PADDLE_WIDTH &&
    ballY + BALL_SIZE >= aiY &&
    ballY <= aiY + aiPaddleHeight
  ) {
    ballX = WIDTH - PADDLE_MARGIN - PADDLE_WIDTH - BALL_SIZE;
    ballVX *= -1;
    let hitPos = (ballY + BALL_SIZE / 2) - (aiY + aiPaddleHeight / 2);
    ballVY = hitPos * 0.28 + (Math.random() - 0.5) * 2;
    ballSpeed += BALL_SPEED_INCREMENT;
    ballVX = Math.sign(ballVX) * ballSpeed;
    ballVY = Math.sign(ballVY) * Math.min(Math.abs(ballVY), ballSpeed * 2);
  }

  if (ballX < 0) {
    aiScore++;
    aiPaddleHeight = Math.max(40, aiPaddleHeight - 10);
    if (aiScore >= MAX_SCORE) {
      setTimeout(() => resetGame("AI"), 500);
      return;
    }
    resetBall(-1);
  } else if (ballX + BALL_SIZE > WIDTH) {
    playerScore++;
    if (playerScore >= MAX_SCORE) {
      setTimeout(() => resetGame("Player"), 500);
      return;
    }
    resetBall(1);
  }

  let aiCenter = aiY + aiPaddleHeight / 2;
  let ballCenter = ballY + BALL_SIZE / 2;
  let aiMove = Math.min(PADDLE_SPEED, Math.abs(ballCenter - aiCenter));
  if (aiCenter < ballCenter - 10) aiY += aiMove;
  else if (aiCenter > ballCenter + 10) aiY -= aiMove;
  aiY = Math.max(0, Math.min(HEIGHT - aiPaddleHeight, aiY));

  document.getElementById("playerScore").textContent = playerScore;
  document.getElementById("aiScore").textContent = aiScore;
}

function resetBall(direction) {
  ballX = WIDTH / 2 - BALL_SIZE / 2;
  ballY = HEIGHT / 2 - BALL_SIZE / 2;
  ballSpeed = 8;
  ballVX = ballSpeed * direction;
  ballVY = ballSpeed * (Math.random() * 2 - 1);
}

function resetGame(winner) {
  playerScore = 0;
  aiScore = 0;
  aiPaddleHeight = PADDLE_HEIGHT;
  resizeCanvas();
  let message = winner + " wins! Game resets.";
  ctx.fillStyle = "#fff";
  ctx.font = "32px Arial";
  ctx.fillText(message, WIDTH / 2 - 140, HEIGHT / 2);
}

function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  ctx.strokeStyle = "#fff";
  ctx.setLineDash([8, 14]);
  ctx.beginPath();
  ctx.moveTo(WIDTH / 2, 0);
  ctx.lineTo(WIDTH / 2, HEIGHT);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#fff";
  ctx.fillRect(PADDLE_MARGIN, playerY, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(WIDTH - PADDLE_MARGIN - PADDLE_WIDTH, aiY, PADDLE_WIDTH, aiPaddleHeight);

  ctx.beginPath();
  ctx.arc(ballX + BALL_SIZE / 2, ballY + BALL_SIZE / 2, BALL_SIZE / 2, 0, Math.PI * 2);
  ctx.fill();
}

resizeCanvas();
gameLoop();