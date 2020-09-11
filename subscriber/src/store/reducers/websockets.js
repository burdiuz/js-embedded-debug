const getInitialState = () => ({
  list: [],
  messages: {},
});

export const websocketInfoClear = (state) => ({
  ...state,
  list: [],
  messages: {},
});

export const websocketUpdated = (state, { payload }) => {
  const { list } = state;

  const listIndex = list.findIndex(({ index }) => index === payload.index);

  if (listIndex < 0) {
    return {
      ...state,
      list: [...state.list, payload],
      messages: {
        ...state.messages,
        [payload.index]: [],
      },
    };
  }

  const newList = list.slice();
  newList[listIndex] = payload;

  return { ...state, list: newList };
};

export const websocketMessage = (state, { payload }) => {
  const {
    messages: { [payload.index]: messageList },
  } = state;

  return {
    ...state,
    messages: {
      ...state.messages,
      [payload.index]: messageList ? [...messageList, payload] : [payload],
    },
  };
};

export default getInitialState;
