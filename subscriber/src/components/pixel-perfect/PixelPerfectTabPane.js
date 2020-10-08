import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Radio, Select, Input, Slider } from 'antd';

const PixelPerfectTabPane = () => (
  <div
    style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    }}
  >
    <div
      style={{
        display: 'flex',
      }}
    >
      <Radio.Group size="small">
        <Radio.Button value="off">Rulers Off</Radio.Button>
        <Radio.Button value="on">Rulers On</Radio.Button>
      </Radio.Group>
      <Radio.Group size="small" style={{ margin: '0 10px' }}>
        <Radio.Button value="">Grid Off</Radio.Button>
        <Radio.Button value="GRID_10">Grid 10px</Radio.Button>
        <Radio.Button value="GRID_20">Grid 20px</Radio.Button>
        <Radio.Button value="GRID_50">Grid 50px</Radio.Button>
      </Radio.Group>
      <div style={{ padding: '4px 5px 0 0' }}>Zoom:</div>
      <Slider size="small" min={0.1} max={3} step={0.1} style={{ flex: 1 }} />
    </div>
    <div
      style={{
        display: 'flex',
      }}
    >
      <div
        style={{
          flex: '1 1 200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Slider size="small" min={0.1} max={2} step={0.1} />
        <Slider size="small" min={0} max={1} step={0.1} />
        <div
          style={{
            display: 'flex',
          }}
        >
          <Input placeholder="X" />
          <Input placeholder="Y" />
        </div>
      </div>
    </div>
    Work in progress...
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default connect(null, {})(PixelPerfectTabPane);
