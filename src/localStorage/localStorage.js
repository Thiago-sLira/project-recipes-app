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

export const getLocalStorageEmail = (key) => {
  if (!JSON.parse(localStorage.getItem(key))) {
    console.log('entrou');
    localStorage.setItem(key, JSON.stringify({ email: 'Logue com um email' }));
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
};
