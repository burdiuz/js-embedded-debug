import React from 'react';
import { Tabs } from 'antd';

import ConsoleView from './ConsoleView';
import CommandInput from './CommandInput';

import logo from './logo.svg';

import './App.css';

const { TabPane } = Tabs;

function App() {
  return (
    <Tabs defaultActiveKey="1" className="main-tabs">
      <TabPane tab="&nbsp;" key="0" disabled></TabPane>
      <TabPane tab="Console" key="1" className="console-tab">
        <ConsoleView></ConsoleView>
        <CommandInput></CommandInput>
      </TabPane>
      <TabPane tab="Network" key="2"></TabPane>
      <TabPane tab="Cookies" key="3"></TabPane>
      <TabPane tab="Local Storage" key="4"></TabPane>
      <TabPane tab="Session Storage" key="5"></TabPane>
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
}

export default App;
