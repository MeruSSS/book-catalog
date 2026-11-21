// Calls `callback` only after `delay` ms pass without new calls
export const debounce = (callback, delay = 500) => {
  let timerId;

  const debounced = (...args) => {
    clearTimeout(timerId); // each new call restarts the wait
    timerId = setTimeout(() => callback(...args), delay);
  };

  // Cancels a pending call
  debounced.cancel = () => clearTimeout(timerId);

  return debounced;
};