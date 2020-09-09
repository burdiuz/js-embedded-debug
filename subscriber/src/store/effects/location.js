import { take } from '@actualwave/redux-side-effect';
import { LOCATION_READ } from 'store/actions/location';
import { Command } from 'message/command';
import { getServiceInstance } from 'communication';

take(LOCATION_READ, async () => {
  const comm = getServiceInstance();

  comm.send(Command.READ_LOCATION);
});
