import React from 'react';
import { Tabs } from 'antd';
import CookiesTabPane from './CookiesTabPane';

export const renderCookiesTab = () => (
  <Tabs.TabPane tab="Cookies" key="cookies">
    <CookiesTabPane />
  </Tabs.TabPane>
);

export { CookiesTabPane };
