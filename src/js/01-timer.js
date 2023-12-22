import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "flatpickr/dist/flatpickr.min.css";

document.addEventListener('DOMContentLoaded', function () {
  let userSelectedDate = null;
  let timerInterval;
  document.querySelector('[data-start]').disabled = true;
  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];

      if (selectedDate <= new Date()) {
        // дата в минулому
        iziToast.warning({
          title: 'Caution',
          message: 'Please choose a date in the future',
        });
        document.querySelector('[data-start]').disabled = true;
      } else {
        // дата в майбутньому
        userSelectedDate = selectedDate;
        document.querySelector('[data-start]').disabled = false;
      }
    },
  };

  flatpickr('#datetime-picker', options);

  document.querySelector('[data-start]').addEventListener('click', function () {
    if (userSelectedDate) {
      // обчислення різниці між датами
      const timeDifference = userSelectedDate - new Date();
      const { days, hours, minutes, seconds } = convertMs(timeDifference);
        (days, hours, minutes, seconds);

      // запуск таймера
      timerInterval = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(userSelectedDate - new Date());
        updateTimer(days, hours, minutes, seconds);
      }, 1000);
    }
  });

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  function updateTimer(days, hours, minutes, seconds) {
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(timerInterval);
      iziToast.success({
        title: `Success`,
        message: `Timer has finished!`
      });
    }
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }  
});