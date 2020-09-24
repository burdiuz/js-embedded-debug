const time = () => (Date.now() / 1000) | 0;

const getInitialState = () => ({
  pingTime: time(),
  pongTime: 0,
  started: false,
  toolList: [],
  tools: {},
});

export const connectedToolsSet = (state, { payload }) => ({
  ...state,
  toolList: payload,
  tools: payload.reduce((res, tool) => ({ ...res, [tool]: true }), {}),
});

export const connectionPing = (state) => ({
  ...state,
  pingTime: time(),
});

export const connectionTestStart = (state) => ({
  ...state,
  started: true,
});

export const connectionPong = (state) => ({
  ...state,
  pongTime: time(),
});

export default getInitialState;
