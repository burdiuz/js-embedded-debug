import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { isImageLoaded } from 'store/selectors/pixel-perfect';

import ImageSettings from './ImageSettings';
import ImageLoad from './ImageLoad';
import Measurements from './Measurements';
import Properties from './Properties';

const PixelPerfectTabPane = ({ imageLoaded }) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
      }}
    >
      <Measurements />
      {imageLoaded ? <ImageSettings /> : <ImageLoad />}
      <Properties />
    </div>
  );
};

export default connect((state) => ({
  imageLoaded: isImageLoaded(state),
}))(PixelPerfectTabPane);
