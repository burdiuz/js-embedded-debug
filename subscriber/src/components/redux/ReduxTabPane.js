import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider } from 'antd';
import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons';
import { connect } from 'react-redux';
import { reduxInfoClear } from 'store/actions/redux';
import { getReduxActions } from 'store/selectors/redux';

const ReduxAction = ({ action }) => {
  const [expanded, setExpanded] = useState(false);
  const [json, setJson] = useState('');

  useEffect(() => {
    setJson(JSON.stringify(action, null, 2));
  }, []);

  return (
    <>
      <div style={{ cursor: 'pointer' }} onClick={() => setExpanded(!expanded)}>
        {expanded ? (
          <CaretDownFilled style={{ margin: '0 10px' }} />
        ) : (
          <CaretRightFilled style={{ margin: '0 10px' }} />
        )}
        <span>{action.type}</span>
      </div>
      {expanded ? (
        <pre
          style={{
            border: '1px solid #eee',
            padding: '5px',
            margin: '0 10px 0 30px',
            fontSize: '0.8em',
            overflowY: 'auto',
            maxHeight: '200px',
          }}
        >
          {json}
        </pre>
      ) : null}
      <Divider />
    </>
  );
};

const ReduxTabPane = ({ list, clear }) => {
  return (
    <>
      <div
        style={{
          position: 'relative',
          height: '100%',
          overflowY: 'auto',
        }}
      >
        {list.length ? null : (
          <div style={{ margin: '20px' }}>No new actions were captured.</div>
        )}
        {list.map((action, i) => (
          <ReduxAction key={i} action={action} />
        ))}
      </div>
      <Button
        type="primary"
        disabled={!list.length}
        onClick={clear}
        style={{ position: 'absolute', top: '55px', right: '5px' }}
      >
        Clear
      </Button>
    </>
  );
};

export default connect(
  (state) => ({
    list: getReduxActions(state),
  }),
  {
    clear: reduxInfoClear,
  },
)(ReduxTabPane);
