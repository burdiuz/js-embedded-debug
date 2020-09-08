import { take } from '@actualwave/redux-side-effect';
import {
  SESSION_STORAGE_READ,
  SESSION_STORAGE_SET,
  SESSION_STORAGE_REMOVE,
} from 'store/actions/session-storage';
import { Command } from 'message/command';
import { getServiceInstance } from 'communication';

take(SESSION_STORAGE_READ, async () => {
  const comm = getServiceInstance();

  comm.send(Command.READ_SESSION_STORAGE);
});

take(SESSION_STORAGE_SET, async ({ payload: { key, value } }) => {
  const comm = getServiceInstance();

  comm.send(Command.SESSION_STORAGE_SET, { key, value });
});

take(SESSION_STORAGE_REMOVE, async ({ payload: { key } }) => {
  const comm = getServiceInstance();

  comm.send(Command.SESSION_STORAGE_REMOVE, { key });
});
