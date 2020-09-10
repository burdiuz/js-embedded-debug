import React from 'react';
import { Tabs } from 'antd';

import ConsoleTabPane from './console/ConsoleTabPane';
import ElementTabPane from './element/ElementTabPane';
import CookiesTabPane from './cookies/CookiesTabPane';
import LocalStorageTabPane from './local-storage/LocalStorageTabPane';
import XhrTabPane from './xhr/XhrTabPane';
import WebSocketTabPane from './websocket/WebSocketTabPane';
import SessionStorageTabPane from './session-storage/SessionStorageTabPane';
import ReduxTabPane from './redux/ReduxTabPane';
import LocationTabPane from './location/LocationTabPane';

import logo from '../logo.svg';

const { TabPane } = Tabs;

/*
 TODO: Make injection to tell console which modules are active to show only tabs which will get the communication
*/

const MainView = () => (
  <Tabs defaultActiveKey="console" className="main-tabs">
    <TabPane tab="&nbsp;" key="spacer" disabled></TabPane>
    <TabPane tab="Console" key="console" className="console-tab">
      <ConsoleTabPane />
    </TabPane>
    <TabPane tab="Element" key="element">
      <ElementTabPane />
    </TabPane>
    <TabPane tab="XHR" key="xhr">
      <XhrTabPane />
    </TabPane>
    <TabPane tab="WebSockets" key="websockets">
      <WebSocketTabPane />
    </TabPane>
    <TabPane tab="Cookies" key="cookies">
      <CookiesTabPane />
    </TabPane>
    <TabPane tab="Local Storage" key="local-storage">
      <LocalStorageTabPane />
    </TabPane>
    <TabPane tab="Session Storage" key="session-storage">
      <SessionStorageTabPane />
    </TabPane>
    <TabPane tab="Redux" key="redux">
      <ReduxTabPane />
    </TabPane>
    <TabPane tab="Location" key="location">
      <LocationTabPane />
    </TabPane>
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
);

export default MainView;
