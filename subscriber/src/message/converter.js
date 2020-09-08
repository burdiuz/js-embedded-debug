import { consoleLogReceived, evalCommandReceived } from 'store/actions/console';
import { cookiesUpdate } from 'store/actions/cookies';
import { localStorageUpdate } from 'store/actions/local-storage';
import { networkUpdateReceived } from 'store/actions/network';
import { sessionStorageUpdate } from 'store/actions/session-storage';

import { Command } from './command';
import { getMessageCommand, getMessageData } from './message';

const converter = (dispatch) => (message) => {
  const data = getMessageData(message);

  switch (getMessageCommand(message)) {
    case Command.CONSOLE_LOG:
      dispatch(consoleLogReceived(data));
      break;
    case Command.DOM_NODE_SELECTED:
      break;
    case Command.EVAL_COMMAND_RESPONSE:
      dispatch(evalCommandReceived(data));
      break;
    case Command.NETWORK_UPDATE:
      dispatch(networkUpdateReceived(data));
      break;
    case Command.READ_COOKIES_RESPONSE:
      dispatch(cookiesUpdate(data));
      break;
    case Command.READ_LOCAL_STORAGE_RESPONSE:
      dispatch(localStorageUpdate(data));
      break;
    case Command.READ_SESSION_STORAGE_RESPONSE:
      dispatch(sessionStorageUpdate(data));
      break;
    case Command.REDUX_ACTION:
      break;
  }
};

export default converter;
