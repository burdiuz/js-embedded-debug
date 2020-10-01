export const getData = ({ textdata: { data } }) => data;
export const getTitle = ({ textdata: { title } }) => title;
export const isAvailable = (state) => Boolean(getData(state));
