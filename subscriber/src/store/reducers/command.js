const getInitialState = () => ({
  list: [],
});

export const commandHistoryAdd = (state, { payload }) => {
  if (!payload) {
    return state;
  }

  const { list } = state;
  const nextList = [...list, payload];

  if (nextList.length > 50) {
    nextList.length = 50;
  }

  return {
    ...state,
    list: nextList,
  };
};

export default getInitialState;
