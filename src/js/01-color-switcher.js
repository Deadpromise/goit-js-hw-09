const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');
const TIMER_INTERVAL = 1000;
let timerId = null;

stopBtnRef.setAttribute('disabled', 'disabled');

startBtnRef.addEventListener('click', onStartClick);
stopBtnRef.addEventListener('click', onStopClick);

function onStartClick() {
    timerId = setInterval(changeBodyBgC, TIMER_INTERVAL);
    startBtnRef.setAttribute('disabled', 'disabled');
    stopBtnRef.removeAttribute('disabled');
};

function changeBodyBgC () {
    const currentColor = getRandomHexColor();
    bodyRef.style.backgroundColor = currentColor;
};

function onStopClick() {
    clearInterval(timerId);
    startBtnRef.removeAttribute('disabled');
    stopBtnRef.setAttribute('disabled', 'disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};