import { take } from '@actualwave/redux-side-effect';
import {
  DOM_NODE_LOOKUP,
  DOM_QUERY_SELECTOR,
  DOM_NODE_SET_ATTRIBUTE,
  DOM_NODE_SET_STYLE,
  DOM_NODE_COMPUTED_STYLE,
} from 'store/actions/domelement';
import { Command } from 'message/command';
import { getServiceInstance } from 'communication';

take(DOM_NODE_LOOKUP, async () => {
  const comm = getServiceInstance();

  comm.send(Command.DOM_NODE_LOOKUP);
});

take(DOM_QUERY_SELECTOR, async ({ payload: value }) => {
  const comm = getServiceInstance();

  comm.send(Command.DOM_QUERY_SELECTOR, { value });
});

take(DOM_NODE_SET_ATTRIBUTE, async ({ payload }) => {
  const comm = getServiceInstance();

  comm.send(Command.DOM_NODE_SET_ATTRIBUTE, payload);
});

take(DOM_NODE_SET_STYLE, async ({ payload }) => {
  const comm = getServiceInstance();

  comm.send(Command.DOM_NODE_SET_STYLE, payload);
});

take(DOM_NODE_COMPUTED_STYLE, async ({ payload }) => {
  const comm = getServiceInstance();

  console.log(payload);

  comm.send(Command.DOM_NODE_COMPUTED_STYLE, payload);
});