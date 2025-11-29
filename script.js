const durationInput = document.getElementById("duration");
const startBtn = document.getElementById("buttonStart");
const punchBtn = document.getElementById("punchbutton");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");
const cpsDisplay = document.getElementById("cps");
const bestDisplay = document.getElementById("best");
const resetBtn = document.getElementById("buttonReset");
const shootSound = document.getElementById("shootSound");
const reload = document.getElementById("reload");
let score = 0;
let timeLeft = 0;
let timer = null;
let gameRunning = false;
let bestScore = 0;


function endTest(cps) {
  let category = "";

  if (cps < 3) {
    category = "Slug 🐌";
  } else if (cps < 6) {
    category = "Casual 🙂";
  } else if (cps < 8) {
    category = "Average 😎";
  } else {
    category = "Flash ⚡";
  }

  alert(`Your CPS: ${cps}\nCategory: ${category}`);
}
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

      alert(endTest(cps));
    }
  }, 1000);
});

punchBtn.addEventListener("click", () => {
  if (!gameRunning) return;
  score++;
  shootSound.currentTime = 0; 
  shootSound.play();
  scoreDisplay.textContent = score;
});
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  score = 0;
  timeLeft = 0;
  gameRunning = false;
  reload.play();
  scoreDisplay.textContent = "0";
  timeDisplay.textContent = "0";
  cpsDisplay.textContent = "0.00";
  durationInput.value = "";
});
shootSound.volume = 0.6

