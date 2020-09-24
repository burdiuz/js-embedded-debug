import React from 'react';
import { Tabs } from 'antd';
import WebSocketTabPane from './WebSocketTabPane';

export const renderWebSocketTab = () => (
  <Tabs.TabPane tab="WebSockets" key="websockets">
    <WebSocketTabPane />
  </Tabs.TabPane>
);

export { WebSocketTabPane };
