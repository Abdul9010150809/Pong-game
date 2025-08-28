const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");
const playerScoreEl = document.getElementById("playerScore");
const aiScoreEl = document.getElementById("aiScore");
const themeToggle = document.getElementById("themeToggle");
const resetBtn = document.getElementById("resetBtn");
const pauseBtn = document.getElementById("pauseBtn");
const speedSelect = document.getElementById("speedSelect");
const muteBtn = document.getElementById("muteBtn");
const startOverlay = document.getElementById("startOverlay");
const startBtn = document.getElementById("startBtn");

let playerScore = 0, aiScore = 0;
const paddleWidth = 10, paddleHeight = 100;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballRadius = 8;
let baseSpeed = parseInt(speedSelect.value);
let ballSpeedX = baseSpeed, ballSpeedY = 4;
let isPaused = true, started = false, muted = false;

const bounceSound = new Audio("https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg");
const scoreSound = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");
[bounceSound, scoreSound].forEach(a => { a.preload = "auto"; a.volume = .6 });

function draw() {
  if (!started || isPaused) { requestAnimationFrame(draw); return; }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--accent");
  ctx.fill();
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--text");
  ctx.fillRect(10, playerY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth - 10, aiY, paddleWidth, paddleHeight);
  ballX += ballSpeedX;
  ballY += ballSpeedY;
  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY *= -1;
    if (!muted) bounceSound.currentTime = 0, bounceSound.play();
  }
  if (ballX - ballRadius < 20 && ballY > playerY && ballY < playerY + paddleHeight) {
    ballSpeedX *= -1;
    if (!muted) bounceSound.currentTime = 0, bounceSound.play();
  }
  if (ballX + ballRadius > canvas.width - 20 && ballY > aiY && ballY < aiY + paddleHeight) {
    ballSpeedX *= -1;
    if (!muted) bounceSound.currentTime = 0, bounceSound.play();
  }
  aiY += (ballY - (aiY + paddleHeight / 2)) * 0.09;
  if (ballX < 0) {
    aiScore++;
    if (!muted) scoreSound.currentTime = 0, scoreSound.play();
    resetBall();
  } else if (ballX > canvas.width) {
    playerScore++;
    if (!muted) scoreSound.currentTime = 0, scoreSound.play();
    resetBall();
  }
  playerScoreEl.textContent = playerScore;
  aiScoreEl.textContent = aiScore;
  requestAnimationFrame(draw);
}

function resetBall() {
  baseSpeed = parseInt(speedSelect.value);
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = (Math.random() > 0.5 ? 1 : -1) * baseSpeed;
  ballSpeedY = (Math.random() > 0.5 ? 1 : -1) * 4;
}

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  playerY = e.clientY - rect.top - paddleHeight / 2;
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

resetBtn.addEventListener("click", () => {
  playerScore = 0;
  aiScore = 0;
  playerScoreEl.textContent = "0";
  aiScoreEl.textContent = "0";
  resetBall();
});

pauseBtn.addEventListener("click", () => {
  if (!started) return;
  isPaused = !isPaused;
  pauseBtn.textContent = isPaused ? "▶ Play" : "⏸ Pause";
});

speedSelect.addEventListener("change", () => {
  const s = parseInt(speedSelect.value);
  ballSpeedX = s * (ballSpeedX >= 0 ? 1 : -1);
});

muteBtn.addEventListener("click", () => {
  muted = !muted;
  muteBtn.textContent = muted ? "🔇 Muted" : "🔊 Sound";
});

startBtn.addEventListener("click", () => {
  started = true;
  isPaused = false;
  startOverlay.classList.add("hidden");
  resetBall();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!started) return;
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "▶ Play" : "⏸ Pause";
  }
});

draw();
