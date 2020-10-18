export const getCurrentPongDelay = ({ connection: { pingTime, pongTime } }) =>
  pingTime - pongTime;

export const hasConnectionTestStarted = ({ connection: { started } }) =>
  started;

export const isConnectionActive = (state) => getCurrentPongDelay(state) < 6;

export const getConnectedTools = ({ connection: { toolList } }) => toolList;

export const isToolConnected = ({ connection: { tools } }, { tool }) => !!tools[tool];
