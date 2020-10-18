import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Radio, Select, Input, Slider, Checkbox } from 'antd';

import {
  pixelPerfectShowImage,
  pixelPerfectImageSettings,
} from 'store/actions/pixel-perfect';

import {
  getImageData,
  getImageScale,
  getImageOpacity,
  getImageOffsetX,
  getImageOffsetY,
} from 'store/selectors/pixel-perfect';

const ImageSettings = ({
  data,
  scale,
  opacity,
  offsetX,
  offsetY,
  setImageSettings,
  showImage,
}) => (
  <div
    style={{
      flex: '1 0 400px',
      display: 'flex',
      margin: '0 5px 5px 5px',
      padding: '5px',
      border: '1px solid #aaa',
    }}
  >
    <div
      style={{
        flex: '0 1 200px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
      }}
    >
      <div style={{ marginTop: '5px' }}>Scale</div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Slider
          value={scale}
          size="small"
          min={0.1}
          max={2}
          step={0.1}
          onChange={(value) => setImageSettings({ scale: value })}
          style={{ flex: 1, marginRight: '10px' }}
        />
        <Input
          size="small"
          value={scale}
          onChange={({ target: { value } }) =>
            setImageSettings({ scale: value })
          }
          style={{ flex: '0 0 60px' }}
        />
      </div>
      <div style={{ marginTop: '5px' }}>Opacity</div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Slider
          value={opacity}
          size="small"
          min={0}
          max={1}
          step={0.1}
          onChange={(value) => setImageSettings({ opacity: value })}
          style={{ flex: 1, marginRight: '10px' }}
        />
        <Input
          size="small"
          value={opacity}
          onChange={({ target: { value } }) =>
            setImageSettings({ opacity: value })
          }
          style={{ flex: '0 0 60px' }}
        />
      </div>
      <div style={{ marginTop: '5px' }}>Position</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Input
          size="small"
          value={offsetX}
          placeholder="X"
          onChange={({ target: { value } }) =>
            setImageSettings({ offsetX: value })
          }
          style={{ textAlign: 'right' }}
        />
        px
        <div style={{ margin: '0 5px' }}>X</div>
        <Input
          size="small"
          value={offsetY}
          placeholder="Y"
          onChange={({ target: { value } }) =>
            setImageSettings({ offsetY: value })
          }
          style={{ textAlign: 'right' }}
        />
        px
      </div>
    </div>
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginLeft: '10px',
      }}
    >
      <div
        style={{
          width: '100%',
          flex: '0 1 100%',
          backgroundImage: `url("${data}")`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center right',
          marginBottom:'5px'
        }}
      ></div>
      <Button
        size="small"
        ghost
        danger
        onClick={() => showImage(null)}
      >
        Unload
      </Button>
    </div>
  </div>
);

export default connect(
  (state) => ({
    data: getImageData(state),
    scale: getImageScale(state),
    opacity: getImageOpacity(state),
    offsetX: getImageOffsetX(state),
    offsetY: getImageOffsetY(state),
  }),
  {
    showImage: pixelPerfectShowImage,
    setImageSettings: pixelPerfectImageSettings,
  },
)(ImageSettings);
