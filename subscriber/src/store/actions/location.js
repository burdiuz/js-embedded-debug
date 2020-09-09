export const LOCATION_READ = 'locationRead';
export const LOCATION_UPDATE_RECEIVED = 'locationUpdateReceived';

export const locationRead = () => ({
  type: LOCATION_UPDATE_RECEIVED,
});

export const locationUpdateReceived = (info) => ({
  type: LOCATION_UPDATE_RECEIVED,
  payload: info,
});
