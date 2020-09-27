import { take, select } from '@actualwave/redux-side-effect';
import {
  LOCAL_STORAGE_READ,
  LOCAL_STORAGE_SET,
  LOCAL_STORAGE_REMOVE,
  LOCAL_STORAGE_CLIPBOARD_EXPORT,
  LOCAL_STORAGE_BULK_SET,
} from 'store/actions/local-storage';
import { Command } from 'message/command';
import { getConsoleInstance } from 'store/selectors/console';
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

take(LOCAL_STORAGE_CLIPBOARD_EXPORT, async () => {
  const comm = getServiceInstance();

  comm.send(Command.LOCAL_STORAGE_CLIPBOARD_EXPORT);
});

take(LOCAL_STORAGE_BULK_SET, async ({ payload }) => {
  let data;
  const comm = getServiceInstance();
  const msg = await select(getConsoleInstance);

  try {
    data = JSON.parse(payload);
  } catch (error) {
    msg.error(error);
    return;
  }

  comm.send(Command.LOCAL_STORAGE_BULK_SET, data);
});
