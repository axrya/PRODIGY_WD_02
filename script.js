let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const timeDisplay = document.getElementById("time-display");
const startStopBtn = document.getElementById("start-stop-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapsContainer = document.getElementById("laps");

startStopBtn.addEventListener("click", () => {
  if (isRunning) {
    stopTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timer = setInterval(updateTime, 10);
  isRunning = true;
  startStopBtn.textContent = "Stop";
  startStopBtn.style.backgroundColor = "#ffc107";
  resetBtn.disabled = false;
  lapBtn.disabled = false;
}

function stopTimer() {
  clearInterval(timer);
  elapsedTime = Date.now() - startTime;
  isRunning = false;
  startStopBtn.textContent = "Start";
  startStopBtn.style.backgroundColor = "#28a745";
}

function resetTimer() {
  clearInterval(timer);
  elapsedTime = 0;
  isRunning = false;
  startStopBtn.textContent = "Start";
  timeDisplay.textContent = "00:00:00.000";
  lapsContainer.innerHTML = "";
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  startStopBtn.style.backgroundColor = "#28a745";
}

function updateTime() {
  const currentTime = Date.now();
  const timeDiff = currentTime - startTime;
  const milliseconds = Math.floor(timeDiff % 1000);
  const seconds = Math.floor((timeDiff / 1000) % 60);
  const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
  const hours = Math.floor(timeDiff / (1000 * 60 * 60));

  timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(value, digits = 2) {
  return String(value).padStart(digits, '0');
}

function recordLap() {
  const lapTime = document.createElement("div");
  lapTime.textContent = timeDisplay.textContent;
  lapsContainer.appendChild(lapTime);
}

//dark mode 
const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

