import React from 'react';
import { Tabs } from 'antd';
import LocalStorageTabPane from './LocalStorageTabPane';

export const renderLocalStorageTab = () => (
  <Tabs.TabPane tab="Local Storage" key="local-storage">
    <LocalStorageTabPane />
  </Tabs.TabPane>
);

export { LocalStorageTabPane };
