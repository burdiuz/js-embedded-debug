export const readCookies = () =>
  document.cookie.split(';').map((str) => {
    const [key, value] = str.split('=');

    return { key: key.trim(), value: value.trim() };
  });

export const setCookie = (key, value) => {
  document.cookie = `${key}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
};

export const removeCookie = (key) => {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};
