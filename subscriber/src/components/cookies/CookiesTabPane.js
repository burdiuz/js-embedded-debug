import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import * as actions from 'store/actions/cookies';
import { getCookieList } from 'store/selectors/cookies';
import { StorageView, NewItem } from '../StorageView';
import { TextAreaView } from '../TextAreaView';

const CookiesTabPane = ({
  list,
  cookiesRead,
  cookieSet,
  cookieRemove,
  cookiesCopy,
  cookiesImport,
}) => {
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    cookiesRead();
  }, []);

  if (showImport) {
    return (
      <TextAreaView
        title="Import Cookies from JSON"
        placeholder="Provide a JSON object with strings to be saved as cookies"
        save={(data) => {
          cookiesImport(data);
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
      save={cookieSet}
      remove={cookieRemove}
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
        <Button onClick={cookiesRead}>Sync</Button>
        <Button onClick={cookiesCopy}>Copy</Button>
        <Button onClick={() => setShowImport(true)}>Import</Button>
        <NewItem save={cookieSet} style={{ flex: 1 }} />
      </div>
    </StorageView>
  );
};

CookiesTabPane.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  cookiesRead: PropTypes.func.isRequired,
  cookieSet: PropTypes.func.isRequired,
  cookieRemove: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    list: getCookieList(state),
  }),
  {
    cookiesRead: actions.cookiesRead,
    cookieSet: actions.cookieSet,
    cookieRemove: actions.cookieRemove,
    cookiesCopy: actions.cookiesClipboardExport,
    cookiesImport: actions.cookiesBulkSet,
  },
)(CookiesTabPane);
