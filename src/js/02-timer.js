import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const pickerRef = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let intervalId = null;

const INTERVAL = 1000;

startBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const isFuture = selectedDates[0].getTime() > Date.now();
    if (!isFuture) {
        window.alert('Please choose a date in the future');
        return;
    };
      startBtn.removeAttribute('disabled');
  },
};
const fp = flatpickr(pickerRef, options);

startBtn.addEventListener('click', onStart);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
   ;

  return { days, hours, minutes, seconds };
};
function addLeadingZero (value) {
    return String(value).padStart(2, '0');
};

function onStart() {
    intervalId = setInterval(() => {
    const selectedDate = fp.selectedDates[0].getTime();
    const currentTime = Date.now();
    const remainingTime = selectedDate - currentTime;
            
    if (remainingTime < 1000) {
        clearInterval(intervalId);
    };

    const resultingTime = convertMs(remainingTime);
            
    daysRef.textContent = resultingTime.days;
    hoursRef.textContent = resultingTime.hours;
    minutesRef.textContent = resultingTime.minutes
    secondsRef.textContent = resultingTime.seconds;
        
    }, INTERVAL);
};

