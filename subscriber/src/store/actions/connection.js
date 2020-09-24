export const CONNECTED_TOOLS_SET = 'connectedToolsSet';
export const CONNECTION_PING = 'connectionPing';
export const CONNECTION_PONG = 'connectionPong';
export const CONNECTION_TEST_START = 'connectionTestStart';

export const connectedToolsSet = ({ plugins }) => ({
  type: CONNECTED_TOOLS_SET,
  payload: plugins,
});

export const connectionPing = () => ({
  type: CONNECTION_PING,
});

export const connectionPong = () => ({
  type: CONNECTION_PONG,
});

export const connectionTestStart = () => ({
  type: CONNECTION_TEST_START,
});
