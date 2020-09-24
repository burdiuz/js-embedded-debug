import React from 'react';
import { Tabs } from 'antd';
import ConsoleTabPane from './ConsoleTabPane';

export const renderConsoleTab = () => (
  <Tabs.TabPane tab="Console" key="console" className="console-tab">
    <ConsoleTabPane />
  </Tabs.TabPane>
);

export { ConsoleTabPane };
