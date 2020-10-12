import React, { useEffect, useState, memo } from 'react';
import { Tabs } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { connect } from 'react-redux';

import { connectionTestStart } from 'store/actions/connection';
import {
  hasConnectionTestStarted,
  isConnectionActive,
  isToolConnected,
} from 'store/selectors/connection';
import { Tools } from 'message/tools';

import { renderCookiesTab } from './cookies';
import { renderConsoleTab } from './console';
import { renderElementTab } from './element';
import { renderLocationTab } from './location';
import { renderLocalStorageTab } from './local-storage';
import { renderPixelPerfectTab } from './pixel-perfect';
import { renderReduxTab } from './redux';
import { renderSessionStorageTab } from './session-storage';
import { renderWebSocketTab } from './websocket';
import { renderXhrTab } from './xhr';
import { renderInjectTab } from './inject';
import TextData from './TextData';

import logo from '../logo.svg';

const { TabPane } = Tabs;

const ConnectionInfo = memo(({ connected }) =>
  connected ? (
    <CheckCircleFilled
      style={{ color: '#00cc00', margin: '0 0 0 20px' }}
      title="Connected"
    />
  ) : (
    <CloseCircleFilled
      style={{ color: '#cc0000', margin: '0 0 0 20px' }}
      title="Not connected"
    />
  ),
);

const MainView = ({
  connected,
  connectionTestStarted,
  startTest,
  enableConsole,
  enableElement,
  enableXhr,
  enableWebSocket,
  enableCookies,
  enableStorage,
  enableRedux,
  enableLocation,
  enablePixelPerfect,
  enableInject,
}) => {
  const [tab, setTab] = useState('console');

  useEffect(() => {
    if (!connectionTestStarted) {
      startTest();
    }
  }, [connectionTestStarted]);

  return (
    <>
      <Tabs activeKey={tab} onChange={setTab} className="main-tabs">
        <TabPane
          tab={<ConnectionInfo connected={connected} />}
          key="spacer"
          disabled
        ></TabPane>
        {enableConsole && renderConsoleTab()}
        {enableElement && renderElementTab()}
        {enableXhr && renderXhrTab()}
        {enableWebSocket && renderWebSocketTab()}
        {enableCookies && renderCookiesTab()}
        {enableStorage && renderLocalStorageTab()}
        {enableStorage && renderSessionStorageTab()}
        {enableRedux && renderReduxTab()}
        {enableLocation && renderLocationTab()}
        {enablePixelPerfect && renderPixelPerfectTab()}
        {enableInject && renderInjectTab()}
        <TabPane tab="Info" key="info">
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          </div>
        </TabPane>
      </Tabs>
      <TextData />
    </>
  );
};

export default connect(
  (state) => ({
    connected: isConnectionActive(state),
    connectionTestStarted: hasConnectionTestStarted(state),
    enableConsole: isToolConnected(state, { tool: Tools.LOG_CONSOLE }),
    enableElement: isToolConnected(state, { tool: Tools.MANAGE_DOMELEMENT }),
    enableXhr: isToolConnected(state, { tool: Tools.LOG_XHR }),
    enableWebSocket: isToolConnected(state, { tool: Tools.LOG_WEBSOCKET }),
    enableCookies: isToolConnected(state, { tool: Tools.MANAGE_COOKIES }),
    enableStorage: isToolConnected(state, { tool: Tools.MANAGE_STORAGE }),
    enableRedux: isToolConnected(state, { tool: Tools.LOG_REDUX }),
    enableLocation: isToolConnected(state, { tool: Tools.LOG_LOCATION }),
    enablePixelPerfect: isToolConnected(state, { tool: Tools.PIXEL_PERFECT }),
    enableInject: isToolConnected(state, { tool: Tools.INJECT }),
  }),
  {
    startTest: connectionTestStart,
  },
)(MainView);
