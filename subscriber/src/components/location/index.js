import React from 'react';
import { Tabs } from 'antd';
import LocationTabPane from './LocationTabPane';

export const renderLocationTab = () => (
  <Tabs.TabPane tab="Location" key="location">
    <LocationTabPane />
  </Tabs.TabPane>
);

export { LocationTabPane };
