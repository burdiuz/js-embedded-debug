import {
  EVAL_COMMAND_SEND,
  EVAL_COMMAND_RESPONSE,
  CONSOLE_LOG_RECEIVED,
  CONSOLE_INSTANCE_SET,
} from 'store/actions/console';
import { getConsoleInstance } from 'store/selectors/console';
import { take, select } from '@actualwave/redux-side-effect';

take(EVAL_COMMAND_SEND, async ({payload}) => {
  window.postMessage();
});

take(EVAL_COMMAND_RESPONSE, async (action) => {

});

take(CONSOLE_LOG_RECEIVED, async ({ payload: { type, args } }) => {
  const msg = await select(getConsoleInstance);

  msg.push(type, ...args);
});

take(CONSOLE_INSTANCE_SET, async ({ payload: msg }) => {
  msg.log('Console started...');
});
