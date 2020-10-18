import { take, select } from '@actualwave/redux-side-effect';
import {
  EVAL_COMMAND_SEND,
  EVAL_COMMAND_RESPONSE,
} from 'store/actions/command';
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

  if (!msg) {
    console.log('Log received but Console not ready yet.');
    return;
  }

  msg.pushRendered('log', payload);
});
