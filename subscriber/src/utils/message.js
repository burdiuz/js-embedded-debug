export const composeMessage = (command, data) =>
  JSON.stringify({ command, data });

export const readMessage = (str) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    return null;
  }
};

export const getMessageCommand = ({ command }) => command;

export const getMessageData = ({ data }) => data;
