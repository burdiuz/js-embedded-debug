import { take, select } from '@actualwave/redux-side-effect';
import {
  COOKIES_READ,
  COOKIE_SET,
  COOKIE_REMOVE,
  COOKIES_CLIPBOARD_EXPORT,
  COOKIES_BULK_SET,
} from 'store/actions/cookies';
import { Command } from 'message/command';
import { getConsoleInstance } from 'store/selectors/console';
import { getServiceInstance } from 'communication';

take(COOKIES_READ, async () => {
  const comm = getServiceInstance();

  comm.send(Command.READ_COOKIES);
});

take(COOKIE_SET, async ({ payload: { key, value } }) => {
  const comm = getServiceInstance();

  comm.send(Command.COOKIE_SET, { key, value });
});

take(COOKIE_REMOVE, async ({ payload: { key } }) => {
  const comm = getServiceInstance();

  comm.send(Command.COOKIE_REMOVE, { key });
});

take(COOKIES_CLIPBOARD_EXPORT, async () => {
  const comm = getServiceInstance();

  comm.send(Command.COOKIES_CLIPBOARD_EXPORT);
});

take(COOKIES_BULK_SET, async ({ payload }) => {
  let data;
  const comm = getServiceInstance();
  const msg = await select(getConsoleInstance);

  try {
    data = JSON.parse(payload);
  } catch (error) {
    msg.error(error);
    return;
  }

  comm.send(Command.COOKIES_BULK_SET, data);
});
