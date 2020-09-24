export const LOCATION_READ = 'locationRead';
export const LOCATION_UPDATE_RECEIVED = 'locationUpdateReceived';
export const LOCATION_HISTORY_CHANGED = 'locationHistoryChanged';
export const LOCATION_SET = 'locationSet';
export const LOCATION_SET_HASH = 'locationSetHash';
export const LOCATION_RELOAD = 'locationReload';
export const LOCATION_BACKWARD = 'locationBackward';
export const LOCATION_FORWARD = 'locationForward';

export const locationRead = () => ({
  type: LOCATION_READ,
});

export const locationUpdateReceived = (info) => ({
  type: LOCATION_UPDATE_RECEIVED,
  payload: info,
});

export const locationSet = (str) => ({
  type: LOCATION_SET,
  payload: str,
});

export const locationSetHash = (str) => ({
  type: LOCATION_SET_HASH,
  payload: str,
});

export const locationReload = () => ({
  type: LOCATION_RELOAD,
});

export const locationBackward = () => ({
  type: LOCATION_BACKWARD,
});

export const locationForward = () => ({
  type: LOCATION_FORWARD,
});
