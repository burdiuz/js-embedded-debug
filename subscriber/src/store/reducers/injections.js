const getInitialState = () => ({
  list: [
  ],
});

export const injectionAdd = (state, { payload }) => {
  if (!payload) {
    return state;
  }

  const { list } = state;

  return { ...state, list: [...list, payload] };
};

export const injectionRemove = (state, { payload: index }) => {
  const newList = [...state.list];

  newList.splice(index, 1);

  return {
    ...state,
    list: newList,
  };
};

export const injectionsClear = getInitialState;

export default getInitialState;
