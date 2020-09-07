import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cookiesRead, cookieSet, cookieRemove } from 'store/actions/cookies';
import { getCookieList } from 'store/selectors/cookies';

const CookiesTabPane = () => null;

CookiesTabPane.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
    cookiesRead: PropTypes.func.isRequired,
    cookieSet: PropTypes.func.isRequired,
    cookieRemove: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    list: getCookieList(state),
  }),
  {
    cookiesRead,
    cookieSet,
    cookieRemove,
  },
)(CookiesTabPane);
