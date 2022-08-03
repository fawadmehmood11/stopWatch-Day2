const startBtn = document.querySelector('.start');
const splitBtn = document.querySelector('.split');
const resetBtn = document.querySelector('.reset');
const timer = document.querySelector('.timer');
const entryContainer = document.querySelector('.entryContainer');

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let intervalId;
let laps = 1;
let lastLap = {hrs: 0, mins: 0, secs: 0, ms: 0};
let hrs = 0;
let mins = 0;
let secs = 0;
let ms = 0;


 /* functions for adding and removing styles from buttons */
const enableBtn = (btn) => {
    btn.removeAttribute('disabled');
    btn.classList.remove('disabled');
}

const disableBtn = (btn) => {
    btn.setAttribute('disabled', 'disabled');
    btn.classList.add('disabled');
}


/* This function will update the timer on screen with 
   the help of setInterval functions and will be called 
   from startWatch function*/

const updateTime = () => {
    elapsedTime = Date.now() - startTime;
    ms = Math.floor((elapsedTime / 10) % 100);
    secs = Math.floor((elapsedTime / 1000) % 60);
    mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
    hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
    ms = pad(ms);
    secs = pad(secs);
    mins = pad(mins);
    hrs = pad(hrs);
    timer.textContent = `${hrs}:${mins}:${secs}:${ms}`;
}


/* This function will be called when Start/Pause button 
   will be clicked and inside this funcition i'm calling those
   helper function i created above for removing and adding styles
   updateTime function is also called from here which will update
   the timer on screen */
const startWatch = () => {
    const value = startBtn.textContent;
    if(value === 'Pause') {
            startBtn.textContent = 'Start'
            startBtn.style.backgroundColor = '#19a69d'
        enableBtn(resetBtn);
        disableBtn(splitBtn);
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
        splitTime(value);
        return;
    }
    startBtn.textContent = 'Pause'; 
    startBtn.style.backgroundColor = '#fb6580'
    enableBtn(splitBtn)
    disableBtn(resetBtn);
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 1);
}



/* This method will split time when splitBtn will be clicked and 
   display that time on screen with the help of timeEntry function */
const splitTime = (status) =>{
    let lapMs = Math.abs(ms - lastLap.ms);
    let lapSecs = Math.abs(secs - lastLap.secs);
    let lapMins = Math.abs(mins - lastLap.mins);
    let lapHrs = Math.abs(hrs - lastLap.hrs);
    lastLap = {hrs, mins, secs, ms};

    lapMs = pad(lapMs);
    lapSecs = pad(lapSecs);
    lapMins = pad(lapMins);
    lapHrs = pad(lapHrs);
    timeEntry(lapHrs, lapMins, lapSecs, lapMs, status);
}


/* This function is DOM Manupulation and adding time entry to screen */
const timeEntry = (lapHrs, lapMins, lapSecs, lapMs, status) => {
    let printTime = document.createElement("div");
    let lapNo = document.createElement('p');
    let time = document.createElement('p');
    let entryStatus = document.createElement('p');

    printTime.classList.add('flex', 'paddHor' , 'time');

    lapNo.textContent = `#${laps}`
    time.textContent = `${lapHrs}:${lapMins}:${lapSecs}:${lapMs}`;

    printTime.append(lapNo, time, entryStatus);

    if(status === 'Pause') {
        time.style.color = '#fb6580';
        entryStatus.textContent = status
    } else {
        time.style.color = '#f29d26';
        entryStatus.textContent = status;
    }

    entryContainer.appendChild(printTime);
    laps++;
}


/* This function will reset the stopWatch */
const stopTimer = () => {
    disableBtn(resetBtn);
    clearInterval(intervalId);
    startTime = 0;
    elapsedTime = 0;
    currentTime = 0;
    laps = 1;
    lastLap = {hrs: 0, mins: 0, secs: 0, ms: 0};
    hrs = 0;
    mins = 0;
    secs = 0;
    ms = 0;
    timer.textContent = "00:00:00:00";
    entryContainer.textContent = "";
}

const pad = (unit) => {
    return (("0") + unit).length > 2 ? unit : "0" + unit;
}

startBtn.addEventListener('click', startWatch);
splitBtn.addEventListener('click', () => splitTime('Split'));
resetBtn.addEventListener('click', stopTimer);


