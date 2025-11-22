const durationInput = document.getElementById("duration");
const startBtn = document.getElementById("buttonStart");
const punchBtn = document.getElementById("punchbutton");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

let score = 0;
let timeLeft = 0;
let timer = null;
let gameRunning = false;

startBtn.addEventListener("click", () => {
  const duration = Number(durationInput.value);
  if (!Number.isFinite(duration) || duration < 3 || duration > 120) {
    alert("Veuillez entrer une durée entre 3 et 120 secondes.");
    return;
  }

  score = 0;
  timeLeft = duration;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  gameRunning = true;

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      gameRunning = false;
      alert("Temps écoulé ! Score final : " + score);
    }
  }, 1000);
});

punchBtn.addEventListener("click", () => {
  if (!gameRunning) return;
  score++;
  scoreDisplay.textContent = score;
});
