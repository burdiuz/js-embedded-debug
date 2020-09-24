import React from 'react';
import { Tabs } from 'antd';
import SessionStorageTabPane from './SessionStorageTabPane';

export const renderSessionStorageTab = () => (
  <Tabs.TabPane tab="Session Storage" key="session-storage">
    <SessionStorageTabPane />
  </Tabs.TabPane>
);

export { SessionStorageTabPane };
