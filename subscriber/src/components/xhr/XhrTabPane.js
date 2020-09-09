import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { xhrInfoClear } from 'store/actions/xhr';
import { getXhrRequests } from 'store/selectors/xhr';

const XhrTabPane = () => <span>Work in progress...</span>;

export default connect(
  (state) => ({
    list: getXhrRequests(state),
  }),
  {
    clear: xhrInfoClear,
  },
)(XhrTabPane);
