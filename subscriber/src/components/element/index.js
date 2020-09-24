import React from 'react';
import { Tabs } from 'antd';
import ElementTabPane from './ElementTabPane';

export const renderElementTab = () => (
  <Tabs.TabPane tab="Element" key="element">
    <ElementTabPane />
  </Tabs.TabPane>
);

export { ElementTabPane };
