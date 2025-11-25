const durationInput = document.getElementById("duration");
const startBtn = document.getElementById("buttonStart");
const punchBtn = document.getElementById("punchbutton");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const cpsDisplay = document.getElementById("cps");
const bestDisplay = document.getElementById("best");
const resetBtn = document.getElementById("buttonReset");
let score = 0;
let timeLeft = 0;
let timer = null;
let gameRunning = false;
let bestScore = 0;

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
    
    const cps = score / (duration - timeLeft);
    cpsDisplay.textContent = cps.toFixed(2);

    if (timeLeft <= 0) {
      clearInterval(timer);
      gameRunning = false;
      if (score > bestScore) {
        bestScore = score;
        bestDisplay.textContent = bestScore;
      }

      alert("Temps écoulé ! Score final : " + score + 
            " | CPS moyen : " + (score / duration).toFixed(2));
    }
  }, 1000);
});

punchBtn.addEventListener("click", () => {
  if (!gameRunning) return;
  score++;
  scoreDisplay.textContent = score;
});
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  score = 0;
  timeLeft = 0;
  gameRunning = false;
  scoreDisplay.textContent = "0";
  timeDisplay.textContent = "0";
  cpsDisplay.textContent = "0.00";
  durationInput.value = "";
});
