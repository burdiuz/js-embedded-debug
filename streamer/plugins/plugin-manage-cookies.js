((EDConsole) => {
  const PLUGIN_NAME = 'manage-cookies';
  const Command = {
    READ_COOKIES: 'read-cookies',
    READ_COOKIES_RESPONSE: 'read-cookies/response',
    COOKIE_SET: 'cookie-set',
    COOKIE_REMOVE: 'cookie-remove',
    COOKIES_CLIPBOARD_EXPORT: 'cookies-clipboard-export',
    COOKIES_BULK_SET: 'cookies-bulk-set',

    TEXTDATA_SHOW: 'textdata-show',
  };

  const readCookies = () =>
    document.cookie
      .split(';')
      .filter((item) => !!item.trim())
      .map((str) => {
        const [key, value] = str.split('=');

        return { key: key.trim(), value: value.trim() };
      });

  const setCookie = (key, value) => {
    document.cookie = `${key}=${value}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
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
    },
  );

  EDConsole.setCommandHandler(
    Command.COOKIES_CLIPBOARD_EXPORT,
    (_, inc, sendResponse) => {
      let data = '';
      const cookies = readCookies();

      try {
        data = JSON.stringify(cookies, null, 2);

        navigator.clipboard.writeText(data);
      } catch (error) {}

      if (data) {
        sendResponse(Command.TEXTDATA_SHOW, { title: 'Cookies', data });
      }
    },
  );

  EDConsole.setCommandHandler(
    Command.COOKIES_BULK_SET,
    (_, data, sendResponse) => {
      if (data instanceof Array) {
        data.forEach(({ key, value }) => setCookie(key, value));
      } else {
        Object.keys(data).forEach((key) => setCookie(key, data[key]));
      }

      sendResponse(Command.READ_COOKIES_RESPONSE, readCookies());
    },
  );

  EDConsole.registerPlugin(PLUGIN_NAME);
})(window.EDConsole);
