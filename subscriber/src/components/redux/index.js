import React from 'react';
import { Tabs } from 'antd';
import ReduxTabPane from './ReduxTabPane';

export const renderReduxTab = () => (
  <Tabs.TabPane tab="Redux" key="redux">
    <ReduxTabPane />
  </Tabs.TabPane>
);

export { ReduxTabPane };
