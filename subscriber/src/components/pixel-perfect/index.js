import React from 'react';
import { Tabs } from 'antd';
import PixelPerfectTabPane from './PixelPerfectTabPane';

export const renderPixelPerfectTab = () => (
  <Tabs.TabPane tab="Pixel Perfect" key="pixel-perfect">
    <PixelPerfectTabPane />
  </Tabs.TabPane>
);

export { PixelPerfectTabPane };
