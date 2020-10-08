import { take } from '@actualwave/redux-side-effect';
import {
  DOM_NODE_LOOKUP,
  DOM_QUERY_SELECTOR,
  DOM_NODE_SET_ATTRIBUTE,
  DOM_NODE_SET_STYLE,
  DOM_NODE_COMPUTED_STYLE,
  DOM_NODE_COPY_QUERY,
  DOM_NODE_COPY_HTML,
  DOM_NODE_COPY_TEXT,
  DOM_NODE_ASSIGN_VARIABLE,
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

  comm.send(Command.DOM_NODE_COMPUTED_STYLE, payload);
});

take(DOM_NODE_COPY_QUERY, async () => {
  const comm = getServiceInstance();

  comm.send(Command.DOM_NODE_COPY_QUERY);
});

take(DOM_NODE_COPY_HTML, async () => {
  const comm = getServiceInstance();

  comm.send(Command.DOM_NODE_COPY_HTML);
});

take(DOM_NODE_COPY_TEXT, async () => {
  const comm = getServiceInstance();

  comm.send(Command.DOM_NODE_COPY_TEXT);
});

take(DOM_NODE_ASSIGN_VARIABLE, async () => {
  const comm = getServiceInstance();

  comm.send(Command.DOM_NODE_ASSIGN_VARIABLE);
});
