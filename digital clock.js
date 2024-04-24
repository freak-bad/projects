function showTime() {
    const date = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[date.getDay()]; 
    document.getElementById("day-of-week").innerText = dayOfWeek;
    
    let hours = date.getHours().toString().padStart(2, '0');
    let ampm;
if (hours >= 12) {
    ampm = 'PM';
} else {
    ampm = 'AM';
}
    hours = hours % 12 || 12;
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
    const time = hours + ":" + minutes + ":" + seconds + " " + ampm; 
    document.getElementById("clock").innerText = time;

    const _15seconds = date.getSeconds() % 20 === 0;
    if (_15seconds) {
        changeBackground();
    }
}


function changeBackground() {
    const images = [
        "https://getwallpapers.com/wallpaper/full/7/d/f/498629.jpg",
        "https://getwallpapers.com/wallpaper/full/7/d/f/498629.jpg",
        "https://getwallpapers.com/wallpaper/full/f/7/c/500676.jpg",
        "https://getwallpapers.com/wallpaper/full/b/1/9/499319.jpg",
        "https://getwallpapers.com/wallpaper/full/8/f/2/499877.jpg",
        "https://getwallpapers.com/wallpaper/full/d/d/b/499264.jpg",
        "https://getwallpapers.com/wallpaper/full/7/2/c/499092.jpg",
        "https://getwallpapers.com/wallpaper/full/1/2/a/499624.jpg",
        "https://getwallpapers.com/wallpaper/full/7/d/c/49769.jpg",
        "https://getwallpapers.com/wallpaper/full/e/2/a/53953.jpg",
        "https://getwallpapers.com/wallpaper/full/c/3/a/649714.jpg",
        "https://getwallpapers.com/wallpaper/full/f/0/a/569881.jpg",
        "https://wallpapers-clan.com/wp-content/uploads/2024/02/naruto-uzumaki-orange-clouds-desktop-wallpaper-preview.jpg",
        "https://blogger.googleusercontent.com/img/a/AVvXsEhoRQHzPoS5coajfpSgwt8GSCGIeArKNSMOX5I5XzVLGiHqQ4aMzWYWorGZAjM2EiSa_TmXHmBYod1mU55tImCJZwkIj16g6ZANaOXa7euoGcFSDbywxif1cdMWjfGg4TlONz6GYR-J2ZUbq8WD6mzwX-eCIuVT2NNcGK_PjDtA0zCtzdmQAvqLmOqMgci-=s1600",
        "",
    ];
    const randomIndex = Math.floor(Math.random() * images.length);
    const imageUrl = images[randomIndex];
    document.getElementById('background').style.backgroundImage = `url(${imageUrl})`;
}

let sequenceIndex = 0;

function toggleClockStopwatch() {
    const clockContainer = document.getElementById('clock-container');
    const stopwatchContainer = document.getElementById('stopwatch-container');
    const timerContainer = document.getElementById('timer-container');

    switch (sequenceIndex) {
        case 0: // clock
            clockContainer.style.display = 'none';
            stopwatchContainer.style.display = 'block';
            sequenceIndex = 1;
            break;
        case 1: // stopwatch
            stopwatchContainer.style.display = 'none';
            timerContainer.style.display = 'block';
            sequenceIndex = 2;
            break;
        case 2: // timer
            timerContainer.style.display = 'none';
            clockContainer.style.display = 'block';
            sequenceIndex = 0;
            break;
        default:
            break;
    }
}

let clockRunning = true;
let stopwatchRunning = false;
let stopwatchInterval;
let stopwatchTime = 0;

let timerRunning = false;
let timerInterval;
let timerTime = 0;


function startTimer() {
    if (!timerRunning) {
        const hours = parseInt(document.getElementById("hours").value) || 0;
        const minutes = parseInt(document.getElementById("minutes").value) || 0;
        const seconds = parseInt(document.getElementById("seconds").value) || 0;
        timerTime = hours * 3600 + minutes * 60 + seconds;
        if (timerTime > 0) {
            timerInterval = setInterval(updateTimer, 1000);
            timerRunning = true;
        } else {
            alert("Please set a valid timer duration.");
        }
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById("hours").value = "0";
    document.getElementById("minutes").value = "0";
    document.getElementById("seconds").value = "0";
    timerTime = 0;
    updateTimerDisplay();
    timerRunning = false;
}

function updateTimer() {
    if (timerTime > 0) {
        timerTime--;
        updateTimerDisplay();
    } else {
        clearInterval(timerInterval);
        timerRunning = false;
        alert("Timer has ended.");
    }
}

function updateTimerDisplay() {
    const hours = Math.floor(timerTime / 3600);
    const minutes = Math.floor((timerTime % 3600) / 60);
    const seconds = timerTime % 60;
    document.getElementById("timer").innerText = formatHours(hours) + ":" + formatMinutes(minutes) + ":" + formatSeconds(seconds);
}

function formatHours(hours) {
    return hours < 10 ? "0" + hours : hours.toString();
}

function formatMinutes(minutes) {
    return minutes < 10 ? "0" + minutes : minutes.toString();
}

function formatSeconds(seconds) {
    return seconds < 10 ? "0" + seconds : seconds.toString();
}


function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(updateStopwatch, 10);
        stopwatchRunning = true;
    }
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    document.getElementById("stopwatch").innerText = formatTime(stopwatchTime);
    stopwatchRunning = false;
}

function updateStopwatch() {
    stopwatchTime += 10;
    document.getElementById("stopwatch").innerText = formatTime(stopwatchTime);
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millisecondsFormatted = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${millisecondsFormatted.toString().padStart(2, '0')}`;
}


showTime();
setInterval(showTime, 1000);
