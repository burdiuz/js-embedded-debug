import { take } from '@actualwave/redux-side-effect';
import {
  LOCATION_READ,
  LOCATION_SET,
  LOCATION_SET_HASH,
  LOCATION_RELOAD,
  LOCATION_BACKWARD,
  LOCATION_FORWARD,
} from 'store/actions/location';
import { Command } from 'message/command';
import { getServiceInstance } from 'communication';

take(LOCATION_READ, async () => {
  const comm = getServiceInstance();

  comm.send(Command.READ_LOCATION);
});

take(LOCATION_SET, async ({ payload: value }) => {
  const comm = getServiceInstance();

  comm.send(Command.LOCATION_SET, { value });
});

take(LOCATION_SET_HASH, async ({ payload: value }) => {
  const comm = getServiceInstance();

  comm.send(Command.LOCATION_SET_HASH, { value });
});

take(LOCATION_RELOAD, async () => {
  const comm = getServiceInstance();

  comm.send(Command.LOCATION_RELOAD);
});

take(LOCATION_BACKWARD, async () => {
  const comm = getServiceInstance();

  comm.send(Command.HISTORY_BACK);
});

take(LOCATION_FORWARD, async () => {
  const comm = getServiceInstance();

  comm.send(Command.HISTORY_FORWARD);
});
