import { take } from '@actualwave/redux-side-effect';
import {
  LOCAL_STORAGE_READ,
  LOCAL_STORAGE_SET,
  LOCAL_STORAGE_REMOVE,
} from 'store/actions/local-storage';
import { Command } from 'message/command';
import { getServiceInstance } from 'communication';

take(LOCAL_STORAGE_READ, async () => {
  const comm = getServiceInstance();

  comm.send(Command.READ_LOCAL_STORAGE);
});

take(LOCAL_STORAGE_SET, async ({ payload: { key, value } }) => {
  const comm = getServiceInstance();

  comm.send(Command.LOCAL_STORAGE_SET, { key, value });
});

take(LOCAL_STORAGE_REMOVE, async ({ payload: { key } }) => {
  const comm = getServiceInstance();

  comm.send(Command.LOCAL_STORAGE_REMOVE, { key });
});
