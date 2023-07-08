const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');


let countdownTitle = '';
let countdownDate = '';
let coundownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


//Set Date Input Min with todays date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

//Populate Coundown /Complete UI
function updateDOM(){
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = coundownValue - now;
        const days = Math.floor(distance/day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        //hide input
        inputContainer.hidden = true;

        //If the countdown has ended, show complete
        if (distance < 0 ){
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        } else{
            //Else, show the counntdown in progress
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }

    }, second);

}

//Take Values from form input
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };

    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    //Check for Valid Date
    if(countdownDate === ''){
        alert ("Please select a date for countdown");
    } else{
            //Get number version of current Date, Update Dom
            coundownValue = new Date(countdownDate).getTime();
            updateDOM();
    }

}
//Reset all values
function reset(){
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    //Stop Countdown
    clearInterval(countdownActive);
    //Reset Values
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

function restorePreviousCountdown(){
    //Get countdown from localstorage if available
    if (localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        coundownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

//Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownButton.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);


//On Load, check localstore
restorePreviousCountdown();