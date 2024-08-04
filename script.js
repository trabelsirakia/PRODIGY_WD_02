let timer;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isRunning = false;
let lapCount = 0;
let colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A2'];
let colorIndex = 0;
let colorInterval;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');
const body = document.body;

function updateDisplay() {
    display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function startStopwatch() {
    if (!isRunning) {
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            updateDisplay();
        }, 1000);
        isRunning = true;

        // Start background color change
        colorInterval = setInterval(() => {
            body.style.backgroundColor = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
        }, 1000);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        
        // Stop background color change
        clearInterval(colorInterval);
    }
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
    laps.innerHTML = '';
    lapCount = 0;
    
    // Stop background color change and reset to default color
    clearInterval(colorInterval);
    body.style.backgroundColor = '#f0f0f0';
}

function addLap() {
    if (isRunning) {
        lapCount++;
        const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
        laps.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', addLap);
