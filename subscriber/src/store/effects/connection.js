import { take, put } from '@actualwave/redux-side-effect';
import {
  CONNECTION_PING,
  CONNECTION_TEST_START,
  connectionPing,
} from 'store/actions/connection';
import { Command } from 'message/command';
import { getServiceInstance } from 'communication';

take(CONNECTION_PING, async () => {
  const comm = getServiceInstance();

  comm.send(Command.CONNECTION_PING);
});

take(CONNECTION_TEST_START, async () => {
  setInterval(() => {
    put(connectionPing());
  }, 1000);

  put(connectionPing());
});
