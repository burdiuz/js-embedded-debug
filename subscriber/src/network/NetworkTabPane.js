import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { networkInfoClear } from 'store/actions/network';
import { getNetworkRequests } from 'store/selectors/network';

const NetworkTabPane = () => null;

export default connect(
  (state) => ({
    list: getNetworkRequests(state),
  }),
  {
    clear: networkInfoClear,
  },
)(NetworkTabPane);
