import { consoleLogReceived, evalCommandReceived } from 'store/actions/console';
import { cookiesUpdate } from 'store/actions/cookies';
import { localStorageUpdate } from 'store/actions/local-storage';
import { sessionStorageUpdate } from 'store/actions/session-storage';
import { xhrUpdateReceived } from 'store/actions/xhr';
import { reduxActionReceived } from 'store/actions/redux';
import { locationUpdateReceived } from 'store/actions/location';
import { websocketUpdated, websocketMessage } from 'store/actions/websockets';
import {
  domNodeInfoUpdate,
  domNodeComputedStyleResponse,
} from 'store/actions/domelement';

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
    case Command.XHR_UPDATE:
      dispatch(xhrUpdateReceived(data));
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
      dispatch(reduxActionReceived(data));
      break;
    case Command.READ_LOCATION_RESPONSE:
      dispatch(locationUpdateReceived(data));
      break;
    case Command.WEBSOCKET_UPDATED:
      dispatch(websocketUpdated(data));
      break;
    case Command.WEBSOCKET_MESSAGE:
      dispatch(websocketMessage(data));
      break;
    case Command.DOM_NODE_LOOKUP_RESPONSE:
      dispatch(domNodeInfoUpdate(data));
      break;
    case Command.DOM_QUERY_SELECTOR_RESPONSE:
      dispatch(domNodeInfoUpdate(data));
      break;
    case Command.DOM_NODE_COMPUTED_STYLE_RESPONSE:
      dispatch(domNodeComputedStyleResponse(data));
      break;
  }
};

export default converter;
