export const TEXTDATA_SET = 'textdataSet';
export const TEXTDATA_CLEAR = 'textdataClear';

export const textdataSet = ({ title, data }) => ({
  type: TEXTDATA_SET,
  payload: { title, data },
});

export const textdataClear = () => ({
  type: TEXTDATA_CLEAR,
});
