import { take } from '@actualwave/redux-side-effect';
import { INJECTION_ADD, INJECTION_EXECUTE } from 'store/actions/injections';
import { Command } from 'message/command';
import { getServiceInstance } from 'communication';

const execute = async ({ payload }) => {
  const comm = getServiceInstance();

  comm.send(Command.INJECTION_EXECUTE, payload);
};

take(INJECTION_ADD, execute);

take(INJECTION_EXECUTE, execute);
