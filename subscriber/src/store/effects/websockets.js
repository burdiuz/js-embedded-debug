import { take } from '@actualwave/redux-side-effect';
import { WEBSOCKET_SEND_MESSAGE } from 'store/actions/websockets';
import { Command } from 'message/command';
import { getServiceInstance } from 'communication';

take(WEBSOCKET_SEND_MESSAGE, async ({ payload }) => {
  const comm = getServiceInstance();

  comm.send(Command.WEBSOCKET_MESSAGE_SEND, payload);
});
