import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import {
  sessionStorageRead,
  sessionStorageSet,
  sessionStorageRemove,
} from 'store/actions/session-storage';
import { getSessionStorageItems } from 'store/selectors/session-storage';
import { StorageView, NewItem } from '../StorageView';

const SessionStorageTabPane = ({ list, storageRead, storageSet, storageRemove }) => {
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
