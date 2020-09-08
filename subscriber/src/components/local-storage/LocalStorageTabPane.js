import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import {
  localStorageRead,
  localStorageSet,
  localStorageRemove,
} from 'store/actions/local-storage';
import { getLocalStorageItems } from 'store/selectors/local-storage';
import { StorageView, NewItem } from '../StorageView';

const LocalStorageTabPane = ({
  list,
  storageRead,
  storageSet,
  storageRemove,
}) => {
  useEffect(() => {
    storageRead();
  }, []);

  return (
    <StorageView list={list} save={storageSet} remove={storageRemove}>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <NewItem save={storageSet} />
        <Button type="primary" onClick={storageRead}>
          Refresh
        </Button>
      </div>
    </StorageView>
  );
};

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
