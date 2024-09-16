'use strict';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputUserValue = document.querySelector('.js-form');
inputUserValue.addEventListener('submit', handleUserSabmit);

function handleUserSabmit(event) {
  event.preventDefault();
  const abbreviation = event.currentTarget.elements;
  const selectedOption = abbreviation.state.value;
  const inputDelay = abbreviation.delay.value;
  const promise = new Promise((resolve, rejeckt) => {
    if (selectedOption === 'fulfilled') {
      resolve(inputDelay);
    } else {
      rejeckt(inputDelay);
    }
  });
  promise
    .then(delay => {
      return setTimeout(() => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${delay}ms`,
          position: 'topRight',
        });
      }, delay);
    })
    .catch(delay => {
      return setTimeout(() => {
        iziToast.error({
          message: `❌ Rejected promise in ${delay}ms`,
          position: 'topRight',
          titleColor: '#ffffff',
          messageColor: '#ffffff',
          backgroundColor: '#EF4040',
        });
      }, delay);
    });
  event.currentTarget.reset();
}
