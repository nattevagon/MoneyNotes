export const getStorage = (storageKey) => {
  const data = localStorage.getItem(storageKey);
  return data ? JSON.parse(data) : [];
};

export const saveStorage = (storageKey, data) => {
  localStorage.setItem(storageKey, JSON.stringify(data));
};

export const clearStorage = (storageKey) => {
  localStorage.removeItem(storageKey);
};