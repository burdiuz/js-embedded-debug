const getInitialState = () => ({
  list: [
    {
      title: '',
      type: 'html',
      target: 'Selector',
      operation: 'Content',
      query: 'app-root',
      data: '<span>Hello World!</span>',
    },
    {
      title: 'My CSS Injection',
      type: 'css',
      target: 'BODY',
      operation: 'Append',
      query: '',
      data: 'body { font-weight: bold; }',
    },
    {
      title: '',
      type: 'js',
      target: 'Selector',
      operation: 'Prepend',
      query: 'app-root',
      data: 'console.log("Hello World!");',
    },
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
