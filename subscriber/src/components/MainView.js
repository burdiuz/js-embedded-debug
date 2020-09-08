
import React from 'react';
import { Tabs } from 'antd';

import ConsoleTabPane from './console/ConsoleTabPane';
import CookiesTabPane from './cookies/CookiesTabPane';
import LocalStorageTabPane from './local-storage/LocalStorageTabPane';
import NetworkTabPane from './network/NetworkTabPane';
import SessionStorageTabPane from './session-storage/SessionStorageTabPane';

import logo from '../logo.svg';

const { TabPane } = Tabs;

const MainView = () => (
    <Tabs defaultActiveKey="1" className="main-tabs">
      <TabPane tab="&nbsp;" key="0" disabled></TabPane>
      <TabPane tab="Console" key="1" className="console-tab">
        <ConsoleTabPane />
      </TabPane>
      <TabPane tab="Network" key="2">
        <NetworkTabPane />
      </TabPane>
      <TabPane tab="Cookies" key="3">
        <CookiesTabPane />
      </TabPane>
      <TabPane tab="Local Storage" key="4">
        <LocalStorageTabPane />
      </TabPane>
      <TabPane tab="Session Storage" key="5">
        <SessionStorageTabPane />
      </TabPane>
      <TabPane tab="Redux" key="6"></TabPane>
      <TabPane tab="Info" key="7">
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
