import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input } from 'antd';

import { pixelPerfectWindowSetSize } from 'store/actions/pixel-perfect';

import {
  getWindowWidth,
  getWindowHeight,
  getMouseX,
  getMouseY,
} from 'store/selectors/pixel-perfect';

const Properties = ({
  windowWidth,
  windowHeight,
  mouseX,
  mouseY,
  setWindowSize,
}) => {
  const [width, setWidth] = useState(windowWidth);
  const [height, setHeight] = useState(windowHeight);

  useEffect(() => {
    setWidth(windowWidth);
  }, [windowWidth]);

  useEffect(() => {
    setHeight(windowHeight);
  }, [windowHeight]);

  return (
    <div
      style={{
        flex: '0 0 180px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        margin: '5px',
        minWidth: '120px',
      }}
    >
      <div>Window Size</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          size="small"
          value={width}
          onChange={({ target: { value } }) => setWidth(value)}
          style={{ flex: '1 0 60px', textAlign: 'right' }}
        />
        px
        <div style={{ margin: '0 5px' }}>X</div>
        <Input
          size="small"
          value={height}
          onChange={({ target: { value } }) => setHeight(value)}
          style={{ flex: '1 0 60px', textAlign: 'right' }}
        />
        px
      </div>
      <Button
        ghost
        size="small"
        type="primary"
        onClick={() => setWindowSize({ width, height })}
        style={{ alignSelf: 'flex-end', margin: '5px 0' }}
      >
        Apply
      </Button>
      <div style={{ marginTop: '5px' }}>Mouse Position</div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Input
          readOnly
          size="small"
          value={mouseX}
          style={{ flex: 1, textAlign: 'right' }}
        />
        px
        <div style={{ margin: '0 5px' }}>X</div>
        <Input
          readOnly
          size="small"
          value={mouseY}
          style={{ flex: 1, textAlign: 'right' }}
        />
        px
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    windowWidth: getWindowWidth(state),
    windowHeight: getWindowHeight(state),
    mouseX: getMouseX(state),
    mouseY: getMouseY(state),
  }),
  {
    setWindowSize: pixelPerfectWindowSetSize,
  },
)(Properties);
