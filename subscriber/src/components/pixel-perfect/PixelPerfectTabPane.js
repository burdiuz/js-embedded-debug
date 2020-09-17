import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PixelPerfectTabPane = () => (
  <div
    style={{
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'stretch',
    }}
  >
    Work in progress...
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default connect(null, {})(PixelPerfectTabPane);
