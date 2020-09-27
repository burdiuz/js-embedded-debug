export const COOKIES_READ = 'cookiesRead';
export const COOKIES_UPDATE = 'cookiesUpdate';
export const COOKIE_SET = 'cookieSet';
export const COOKIE_REMOVE = 'cookieRemove';
export const COOKIES_CLIPBOARD_EXPORT = 'cookiesClipboardExport';
export const COOKIES_BULK_SET = 'cookiesBulkSet';

export const cookiesRead = () => ({ type: COOKIES_READ });

export const cookiesUpdate = (list) => ({
  type: COOKIES_UPDATE,
  payload: list,
});

export const cookieSet = (key, value) => ({
  type: COOKIE_SET,
  payload: { key, value },
});

export const cookieRemove = (key) => ({
  type: COOKIE_REMOVE,
  payload: { key },
});

export const cookiesClipboardExport = () => ({
  type: COOKIES_CLIPBOARD_EXPORT,
});

export const cookiesBulkSet = (data) => ({
  type: COOKIES_BULK_SET,
  payload: data,
});
