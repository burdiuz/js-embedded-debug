import React from 'react';
import { Tabs } from 'antd';
import InjectTabPane from './InjectTabPane';

export const renderInjectTab = () => (
  <Tabs.TabPane tab="Inject" key="inject">
    <InjectTabPane />
  </Tabs.TabPane>
);

export { InjectTabPane };
