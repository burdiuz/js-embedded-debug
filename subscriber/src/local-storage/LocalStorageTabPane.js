import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  localStorageRead,
  localStorageSet,
  localStorageRemove,
} from 'store/actions/local-storage';
import { getLocalStorageItems } from 'store/selectors/local-storage';

const LocalStorageTabPane = () => null;

LocalStorageTabPane.propTypes = {
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
    list: getLocalStorageItems(state),
  }),
  {
    storageRead: localStorageRead,
    storageSet: localStorageSet,
    storageRemove: localStorageRemove,
  },
)(LocalStorageTabPane);
