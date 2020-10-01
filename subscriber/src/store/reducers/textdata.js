const getInitialState = () => ({
  data: '',
  title: '',
});

export const textdataSet = (state, { payload: { title = '', data } }) => ({
  ...state,
  title,
  data,
});

export const textdataClear = getInitialState;

export default getInitialState;
