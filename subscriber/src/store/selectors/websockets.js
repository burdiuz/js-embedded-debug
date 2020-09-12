export const getWebsocketList = ({ websockets: { list } }) => list;
export const getWebsocketMessages = ({ websockets: { messages } }, { index }) =>
  messages[index];
