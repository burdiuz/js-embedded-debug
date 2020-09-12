export const UID_LENGTH = 12;

export const generateUID = () => Date.now().toString(32).padEnd(UID_LENGTH);

export const CLIENT_UID = generateUID();

// parsing JSON for every message would cost much more than simply stripping a substring.
export const composeMessage = (command, data, stringifyFallback) => {
  let message;

  try {
    message = JSON.stringify({ command, data });
  } catch (error) {
    if (stringifyFallback) {
      try {
        message = JSON.stringify({ command, data: stringifyFallback(data) });
      } catch (err) {
        console.error(error);
        return null;
      }
    } else {
      console.error(error);
      return null;
    }
  }

  const uid = generateUID();

  registerMessageUID(uid);

  return `${CLIENT_UID}${uid}${message}`;
};

export const isMessage = (str) =>
  str && typeof str === 'string' && str.length > UID_LENGTH;

export const isOwnMessage = (str) =>
  isMessage(str) && str.substr(0, UID_LENGTH) === CLIENT_UID;

export const getMessageUID = (str) => str.substr(UID_LENGTH, UID_LENGTH);

export const parseMessage = (str) => {
  try {
    return JSON.parse(str.substr(UID_LENGTH * 2));
  } catch (error) {
    return null;
  }
};

export const readMessage = ({ data, detail }) => {
  const str = data || detail;

  if (!isMessage(str) || isOwnMessage(str)) {
    return null;
  }

  const uid = getMessageUID(str);

  if (hasMessageUIDRegistered(uid)) {
    return null;
  }

  return parseMessage(str);
};

export const getMessageCommand = ({ command }) => command;

export const getMessageData = ({ data }) => data;

const uids = new Set();

export const registerMessageUID = (uid) => {
  uids.add(uid);
};

export const hasMessageUIDRegistered = (uid) => uids.has(uid);
