import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import {
  sessionStorageRead,
  sessionStorageSet,
  sessionStorageRemove,
  sessionStorageClipboardExport,
  sessionStorageBulkSet,
} from 'store/actions/session-storage';
import { getSessionStorageItems } from 'store/selectors/session-storage';
import { StorageView, NewItem } from '../StorageView';
import { TextAreaView } from '../TextAreaView';

const SessionStorageTabPane = ({
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
        title="Import Session Storage data from JSON"
        placeholder="Provide a JSON object with strings to be saved as Session Storage items"
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
    storageCopy: sessionStorageClipboardExport,
    storageImport: sessionStorageBulkSet,
  },
)(SessionStorageTabPane);
