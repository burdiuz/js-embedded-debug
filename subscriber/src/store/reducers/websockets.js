const getInitialState = () => ({
  list: [],
  messages: {},
});

export const websocketInfoClear = (state) => ({
  ...state,
  list: [],
  messages: {},
});

export const websocketCreated = (state, { payload }) => {
  const { list, messages } = state;

  return {
    ...state,
    list: [
      ...list,
      {
        ...payload,
        createdAt: new Date(),
      },
    ],
    messages: {
      ...messages,
      [payload.index]: [],
    },
  };
};

export const websocketUpdated = (state, { payload }) => {
  const { list } = state;

  const listIndex = list.findIndex(({ index }) => index === payload.index);

  if (listIndex < 0) {
    return state;
  }

  const newList = list.slice();
  newList[listIndex] = {
    ...newList[listIndex],
    ...payload,
    updatedAt: new Date(),
  };

  return { ...state, list: newList };
};

export const websocketMessage = (state, { payload }) => {
  const {
    messages: { [payload.index]: messageList = [] },
  } = state;

  return {
    ...state,
    messages: {
      ...state.messages,
      [payload.index]: [
        ...messageList,
        {
          ...payload,
          createdAt: new Date(),
        },
      ],
    },
  };
};

export default getInitialState;
