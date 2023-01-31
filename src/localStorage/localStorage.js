export const saveLocalStorage = (key, payload) => {
  localStorage.setItem(key, JSON.stringify(payload));
};

export const setLocalStorage = (key, value) => {
  if (!JSON.parse(localStorage.getItem(key))) {
    localStorage.setItem(key, JSON.stringify([value]));
  } else {
    const localStorageData = JSON.parse(localStorage.getItem(key));
    localStorage.setItem(key, JSON.stringify([...localStorageData, value]));
  }
};

export const getLocalStorageEmail = (key) => {
  if (!JSON.parse(localStorage.getItem(key))) {
    localStorage.setItem(key, JSON.stringify({ email: 'Logue com um email' }));
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
};

export const getLocalStorageFavorite = (key) => {
  const resultLocalStorage = JSON.parse(localStorage.getItem(key));
  return resultLocalStorage || [];
};
