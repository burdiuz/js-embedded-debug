import { take, select } from '@actualwave/redux-side-effect';
import {
  CONSOLE_LOG_RECEIVED,
  CONSOLE_INSTANCE_SET,
} from 'store/actions/console';
import { getConsoleInstance } from 'store/selectors/console';

take(CONSOLE_LOG_RECEIVED, async ({ payload: { type, args } }) => {
  const msg = await select(getConsoleInstance);

  msg.pushRendered(type, ...args);
});

take(CONSOLE_INSTANCE_SET, async ({ payload: msg }) => {
  msg.log('Console started...');
});
