export const saveLocalStorage = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload));
};

export const getLocalStorage = (key) => {
  if (!JSON.parse(localStorage.getItem(key))) {
    localStorage.setItem(key, JSON.stringify([]));
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
};
