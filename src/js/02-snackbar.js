import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  // отримання значень 
  const delay = parseInt(this.querySelector('[name="delay"]').value, 10);
  const state = this.querySelector('[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // обробка результатів 
  promise.then(
    (result) => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${result}ms`,
      });
    },
    (result) => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${result}ms`,
      });
    }
  );
});