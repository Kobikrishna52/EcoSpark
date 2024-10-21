const ewaste = document.getElementById('ewaste');
const div2 = document.getElementById('div2');
const message = document.getElementById('message');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startButton');

let offsetX = 0, offsetY = 0, isDragging = false, isTimerRunning = false;
let timeLeft = 10, countdown, ewasteMoved = false;

// Start button event
startButton.addEventListener('click', function () {
    // Reset everything
    message.innerText = "";
    ewasteMoved = false;
    ewaste.style.backgroundColor = "green"; // Reset ewaste color to green
    ewaste.style.position = 'relative'; // Reset position
    ewaste.style.left = '0px'; // Reset left position
    ewaste.style.top = '0px'; // Reset top position
    timerDisplay.innerText = timeLeft = 10; // Reset timer
    isTimerRunning = true; // Enable dragging
    clearInterval(countdown); // Clear any existing countdown
    countdown = setInterval(startTimer, 1000);
});

function startTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
        // Change ewaste color gradually from green to red as time passes
        const redValue = Math.floor((10 - timeLeft) * 25.5);
        ewaste.style.backgroundColor = `rgb(${redValue}, ${255 - redValue}, 0)`; // Green to red transition

    } else {
        clearInterval(countdown);
        disableDragging();
        if (!ewasteMoved) {
            message.innerText = "E-waste can be hazardous, don't keep it at home!";
            message.style.color = "red";
            startButton.textContent = "Start again!";
        }
    }
}

// Enable dragging on mousedown only if timer is running
ewaste.addEventListener('mousedown', function (e) {
    if (isTimerRunning) {
        offsetX = e.clientX - ewaste.offsetLeft;
        offsetY = e.clientY - ewaste.offsetTop;
        isDragging = true;
    }
});

document.addEventListener('mousemove', function (e) {
    if (isDragging) {
        ewaste.style.position = 'absolute';
        ewaste.style.left = e.clientX - offsetX + 'px';
        ewaste.style.top = e.clientY - offsetY + 'px';
    }
});

document.addEventListener('mouseup', function (e) {
    isDragging = false;

    if (isTimerRunning) {
        // Check if ewaste is within div2 bounds
        const ewasteRect = ewaste.getBoundingClientRect();
        const div2Rect = div2.getBoundingClientRect();

        if (ewasteRect.left >= div2Rect.left && ewasteRect.right <= div2Rect.right &&
            ewasteRect.top >= div2Rect.top && ewasteRect.bottom <= div2Rect.bottom) {
            ewasteMoved = true;
            startButton.textContent = "Start again!";
            message.innerText = "Congratulations! You are safe now!";
            message.style.color = "green";
            clearInterval(countdown); // Stop timer
            disableDragging(); // Disable dragging after successful drop
        }
    }
});

// Disable dragging and stop timer
function disableDragging() {
    isTimerRunning = false;
}
