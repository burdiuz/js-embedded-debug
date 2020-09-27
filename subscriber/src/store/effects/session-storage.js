import { take, select } from '@actualwave/redux-side-effect';
import {
  SESSION_STORAGE_READ,
  SESSION_STORAGE_SET,
  SESSION_STORAGE_REMOVE,
  SESSION_STORAGE_CLIPBOARD_EXPORT,
  SESSION_STORAGE_BULK_SET,
} from 'store/actions/session-storage';
import { Command } from 'message/command';
import { getConsoleInstance } from 'store/selectors/console';
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

take(SESSION_STORAGE_CLIPBOARD_EXPORT, async () => {
  const comm = getServiceInstance();

  comm.send(Command.SESSION_STORAGE_CLIPBOARD_EXPORT);
});

take(SESSION_STORAGE_BULK_SET, async ({ payload }) => {
  let data;
  const comm = getServiceInstance();
  const msg = await select(getConsoleInstance);

  try {
    data = JSON.parse(payload);
  } catch (error) {
    msg.error(error);
    return;
  }

  comm.send(Command.SESSION_STORAGE_BULK_SET, data);
});
