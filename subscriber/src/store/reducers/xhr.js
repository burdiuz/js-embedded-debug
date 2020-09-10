const getInitialState = () => ({
  list: [],
});

export const xhrInfoClear = (state) => ({
  ...state,
  list: [],
});

export const xhrkUpdateReceived = (state, { payload: request }) => {
  let { list = [] } = state;
  const pos = list.findIndex(({ index }) => index === request.index);

  if (pos >= 0) {
    list = [...list];
    list[pos] = {
      ...list[pos],
      ...request,
      updatedAt: new Date(),
    };
  } else {
    list = [
      ...list,
      { ...request, createdAt: new Date(), updatedAt: new Date() },
    ];
  }

  return {
    ...state,
    list,
  };
};

export default getInitialState;
