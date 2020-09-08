import { take } from '@actualwave/redux-side-effect';
import {
  COOKIES_READ,
  COOKIE_SET,
  COOKIE_REMOVE,
} from 'store/actions/cookies';
import { Command } from 'message/command';
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
