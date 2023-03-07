// local storage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const deleteItem = ({ key }) => {
  return localStorage.removeItem(key);
};

export const setData = (key, data) => {
  return localStorage.setItem(key, JSON.stringify(data.userName));
};
