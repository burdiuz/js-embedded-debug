import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { xhrInfoClear } from 'store/actions/xhr';
import { getXhrRequests } from 'store/selectors/xhr';

import XhrRequest from './XhrRequest';
import NewXhrRequest from './NewXhrRequest';

const XhrTabPane = ({ list, clear }) => {
  const [request, setRequest] = useState(null);

  if (request) {
    return (
      <NewXhrRequest
        data={request}
        cancel={() => setRequest(null)}
      />
    );
  }

  return (
    <>
      <div
        style={{
          height: '100%',
          overflowY: 'auto',
          paddingTop: '20px',
        }}
      >
        {list.length ? null : (
          <div style={{ margin: '20px' }}>
            No new XHR connections were captured.
          </div>
        )}
        {list.map((data, i) => (
          <XhrRequest key={i} data={data} replay={() => setRequest(data)} />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50px',
          left: 0,
          right: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 5px 10px 0',
        }}
      >
        <Button onClick={() => setRequest({})}>New</Button>
        <Button
          type="primary"
          disabled={!list.length}
          onClick={clear}
          style={{ marginLeft: '5px' }}
        >
          Clear
        </Button>
      </div>
    </>
  );
};

export default connect(
  (state) => ({
    list: getXhrRequests(state),
  }),
  {
    clear: xhrInfoClear,
  },
)(XhrTabPane);
