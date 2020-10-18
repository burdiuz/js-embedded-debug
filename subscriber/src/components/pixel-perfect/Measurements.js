import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Radio, Input, Slider } from 'antd';

import {
  pixelPerfectZoomSet,
  pixelPerfectShowRuler,
  pixelPerfectShowGrid,
  pixelPerfectColumnsShow,
} from 'store/actions/pixel-perfect';

import {
  getZoomLevel,
  getGridType,
  getColumns,
  getColumnsMargin,
  getRulerType,
} from 'store/selectors/pixel-perfect';

const Measurements = ({
  zoom,
  gridType,
  rulerType,
  columns,
  columnsMargin,
  setZoom,
  showRuler,
  showGrid,
  showColumns,
}) => {
  return (
    <div
      style={{
        flex: '0 1 300px',
        display: 'flex',
        flexDirection: 'column',
        margin: '5px',
        minWidth: '220px',
      }}
    >
      Rulers
      <Radio.Group
        value={rulerType}
        size="small"
        onChange={({ target: { value } }) => showRuler(value)}
      >
        <Radio.Button value="">Off</Radio.Button>
        <Radio.Button value="on">On</Radio.Button>
      </Radio.Group>
      <div style={{ marginTop: '5px' }}>Grid</div>
      <Radio.Group
        value={gridType}
        size="small"
        style={{ margin: '5px 0' }}
        onChange={({ target: { value } }) => showGrid(value)}
      >
        <Radio.Button value="">Off</Radio.Button>
        <Radio.Button value="GRID_10">10px</Radio.Button>
        <Radio.Button value="GRID_20">20px</Radio.Button>
        <Radio.Button value="GRID_50">50px</Radio.Button>
      </Radio.Group>
      <div style={{ marginTop: '5px' }}>Columns</div>
      <Radio.Group
        value={columns}
        size="small"
        onChange={({ target: { value } }) =>
          showColumns({ columns: value, margin: columnsMargin })
        }
      >
        <Radio.Button value="">Off</Radio.Button>
        <Radio.Button value="12">12</Radio.Button>
        <Radio.Button value="24">24</Radio.Button>
        <Radio.Button value="36">36</Radio.Button>
        <Radio.Button value={columns}>
          Custom
          <Input
            size="small"
            value={columns}
            onChange={({ target: { value } }) =>
              showColumns({ columns: value, margin: columnsMargin })
            }
            style={{ margin: '0', width: '40px', border: 'none' }}
          />
        </Radio.Button>
      </Radio.Group>
      <div style={{ marginTop: '5px' }}>
        Margins around columns
        <Input
          size="small"
          value={columnsMargin}
          onChange={({ target: { value } }) =>
            showColumns({ columns, margin: value })
          }
          style={{ marginLeft: '5px', width: '80px' }}
        />
      </div>
      <div style={{ marginTop: '5px' }}>Zoom {zoom.toFixed(1)}x</div>
      <Slider
        value={zoom}
        size="small"
        min={0.1}
        max={3.01}
        step={0.1}
        style={{ flex: 1 }}
        onChange={(value) => setZoom(value)}
      />
    </div>
  );
};

export default connect(
  (state) => ({
    zoom: getZoomLevel(state),
    gridType: getGridType(state),
    rulerType: getRulerType(state),
    columns: getColumns(state),
    columnsMargin: getColumnsMargin(state),
  }),
  {
    setZoom: pixelPerfectZoomSet,
    showRuler: pixelPerfectShowRuler,
    showGrid: pixelPerfectShowGrid,
    showColumns: pixelPerfectColumnsShow,
  },
)(Measurements);
