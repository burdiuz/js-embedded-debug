import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { textdataClear } from 'store/actions/textdata';
import { getData, getTitle, isAvailable } from 'store/selectors/textdata';
import { TextAreaView } from './TextAreaView';

const TextData = ({ available, data, title, close }) => {
  if (!available) {
    return null;
  }

  return (
    <TextAreaView
      style={{
        position: 'fixed',
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#ffffff',
      }}
      title={title}
      defaultValue={data}
      placeholder="It appears to be empty."
      saveButtonName=""
      cancelButtonName="Close"
      cancel={close}
    />
  );
};

export default connect(
  (state) => ({
    available: isAvailable(state),
    data: getData(state),
    title: getTitle(state),
  }),
  {
    close: textdataClear,
  },
)(TextData);
