'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    checkUserStatus();
  },
};

flatpickr('input#datetime-picker', options);

// підключення бібліотек ^^^^

const timerBtn = document.querySelector('[data-start]');
const timerInput = document.querySelector('#datetime-picker');
const dataDeys = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
timerBtn.setAttribute('disabled', 'true');
timerBtn.addEventListener('click', handleClick);

function checkUserStatus() {
  if (userSelectedDate < new Date()) {
    iziToast.error({
      title: 'Error',
      titleColor: '#ffffff',
      message: 'Please choose a date in the future',
      position: 'topRight',
      messageColor: '#ffffff',
      backgroundColor: '#EF4040',
    });
    timerBtn.setAttribute('disabled', 'true');
  } else {
    timerBtn.removeAttribute('disabled');
  }
}

function handleClick() {
  if (userSelectedDate > new Date()) {
    iziToast.success({
      title: 'Timer On',
      message: 'The timer has started',
      position: 'topRight',
    });
    const intervalID = setInterval(() => {
      let diff = userSelectedDate - new Date();
      if (diff >= 0) {
        const timerTime = convertMs(diff);
        updateTimerTime(timerTime);
      } else {
        timerInput.removeAttribute('disabled');
        iziToast.success({
          title: 'Timer Finish',
          message: 'The timer is over',
          position: 'topRight',
        });
        clearInterval(intervalID);
      }
    }, 1000);
    timerInput.setAttribute('disabled', 'true');
    timerBtn.setAttribute('disabled', 'true');
  }
}

function updateTimerTime(timerTime) {
  const { days, hours, minutes, seconds } = timerTime;
  dataDeys.textContent = String(days).padStart(2, '0');
  dataHours.textContent = String(hours).padStart(2, '0');
  dataMinutes.textContent = String(minutes).padStart(2, '0');
  dataSeconds.textContent = String(seconds).padStart(2, '0');
}

// Для підрахунку значень
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
