((EDConsole) => {
  const PLUGIN_NAME = 'manage-cookies';
  const Command = {
    READ_COOKIES: 'read-cookies',
    READ_COOKIES_RESPONSE: 'read-cookies/response',
    COOKIE_SET: 'cookie-set',
    COOKIE_REMOVE: 'cookie-remove',
  };

  const readCookies = () =>
    document.cookie.split(';').map((str) => {
      const [key, value] = str.split('=');

      return { key: key.trim(), value: value.trim() };
    });

  const setCookie = (key, value) => {
    document.cookie = `${key}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
  };

  const removeCookie = (key) => {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  };

  EDConsole.setCommandHandler(Command.READ_COOKIES, (_, data, sendResponse) => {
    sendResponse(Command.READ_COOKIES_RESPONSE, readCookies());
  });

  EDConsole.setCommandHandler(Command.COOKIE_SET, (_, data, sendResponse) => {
    setCookie(data.key, data.value);

    sendResponse(Command.READ_COOKIES_RESPONSE, readCookies());
  });

  EDConsole.setCommandHandler(
    Command.COOKIE_REMOVE,
    (_, data, sendResponse) => {
      removeCookie(data.key);

      sendResponse(Command.READ_COOKIES_RESPONSE, readCookies());
    }
  );

  EDConsole.registerPlugin(PLUGIN_NAME);
})(window.EDConsole);
