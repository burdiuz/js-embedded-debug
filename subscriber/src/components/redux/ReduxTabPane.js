import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider } from 'antd';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
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
          <CaretUpFilled style={{ margin: '0 10px' }} />
        ) : (
          <CaretDownFilled style={{ margin: '0 10px' }} />
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
          display: 'flex',
          justifyContent: 'flex-end',
          paddingRight: '5px',
        }}
      >
        <Button type="primary" disabled={!list.length} onClick={clear}>
          Clear
        </Button>
      </div>
      {list.map((action, i) => (
        <ReduxAction key={i} action={action} />
      ))}
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
