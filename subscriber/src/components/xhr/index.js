import React from 'react';
import { Tabs } from 'antd';
import XhrTabPane from './XhrTabPane';

export const renderXhrTab = () => (
  <Tabs.TabPane tab="XHR" key="xhr">
    <XhrTabPane />
  </Tabs.TabPane>
);

export { XhrTabPane };
