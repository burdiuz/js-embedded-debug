import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import * as actions from 'store/actions/cookies';
import { getCookieList } from 'store/selectors/cookies';
import { StorageView, NewItem } from '../StorageView';

const CookiesTabPane = ({ list, cookiesRead, cookieSet, cookieRemove }) => {
  useEffect(() => {
    cookiesRead();
  }, []);

  return (
    <StorageView list={list} save={cookieSet} remove={cookieRemove}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '5px',
        }}
      >
        <NewItem save={cookieSet} />
        <Button type="primary" onClick={cookiesRead}>
          Refresh
        </Button>
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
  },
)(CookiesTabPane);
