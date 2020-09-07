import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  sessionStorageRead,
  sessionStorageSet,
  sessionStorageRemove,
} from 'store/actions/session-storage';
import { getSessionStorageItems } from 'store/selectors/session-storage';

const SessionStorageTabPane = () => null;

SessionStorageTabPane.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
    }),
  ).isRequired,
  storageRead: PropTypes.func.isRequired,
  storageSet: PropTypes.func.isRequired,
  storageRemove: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    list: getSessionStorageItems(state),
  }),
  {
    storageRead: sessionStorageRead,
    storageSet: sessionStorageSet,
    storageRemove: sessionStorageRemove,
  },
)(SessionStorageTabPane);
