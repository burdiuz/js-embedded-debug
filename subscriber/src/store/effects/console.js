import { take, select } from '@actualwave/redux-side-effect';
import {
  EVAL_COMMAND_SEND,
  EVAL_COMMAND_RESPONSE,
  CONSOLE_LOG_RECEIVED,
  CONSOLE_INSTANCE_SET,
} from 'store/actions/console';
import { getConsoleInstance } from 'store/selectors/console';
import { Command } from 'message/command';
import { getServiceInstance } from 'communication';

take(EVAL_COMMAND_SEND, async ({ payload }) => {
  const comm = getServiceInstance();
  const msg = await select(getConsoleInstance);

  msg.info(payload);
  comm.send(Command.EVAL_COMMAND, { value: payload });
});

take(EVAL_COMMAND_RESPONSE, async ({ payload }) => {
  const msg = await select(getConsoleInstance);

  msg.pushRendered('log', payload);
});

take(CONSOLE_LOG_RECEIVED, async ({ payload: { type, args } }) => {
  const msg = await select(getConsoleInstance);

  msg.pushRendered(type, ...args);
});

take(CONSOLE_INSTANCE_SET, async ({ payload: msg }) => {
  msg.log('Console started...');
});
