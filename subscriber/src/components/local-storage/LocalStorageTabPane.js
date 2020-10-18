import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import {
  localStorageRead,
  localStorageSet,
  localStorageRemove,
  localStorageClipboardExport,
  localStorageBulkSet,
} from 'store/actions/local-storage';
import { getLocalStorageItems } from 'store/selectors/local-storage';
import { StorageView, NewItem } from '../StorageView';
import { TextAreaView } from '../TextAreaView';

const LocalStorageTabPane = ({
  list,
  storageRead,
  storageSet,
  storageRemove,
  storageCopy,
  storageImport,
}) => {
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    storageRead();
  }, []);

  if (showImport) {
    return (
      <TextAreaView
        title="Import Local Storage data from JSON"
        placeholder="Provide a JSON object with strings to be saved as Local Storage items"
        save={(data) => {
          storageImport(data);
          setShowImport(false);
        }}
        cancel={() => setShowImport(false)}
        saveButtonName="Import"
      />
    );
  }

  return (
    <StorageView
      size="small"
      list={list}
      save={storageSet}
      remove={storageRemove}
    >
      <div
        style={{
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '5px',
        }}
      >
        <Button onClick={storageRead}>Sync</Button>
        <Button onClick={storageCopy}>Copy</Button>
        <Button onClick={() => setShowImport(true)}>Import</Button>
        <NewItem save={storageSet} style={{ flex: 1 }} />
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
    storageCopy: localStorageClipboardExport,
    storageImport: localStorageBulkSet,
  },
)(LocalStorageTabPane);
