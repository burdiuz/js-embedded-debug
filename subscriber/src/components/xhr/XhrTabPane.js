import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Divider, Input } from 'antd';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import { xhrInfoClear } from 'store/actions/xhr';
import { getXhrRequests } from 'store/selectors/xhr';

const { TextArea } = Input;

const XhrRequestInfo = ({
  title = '',
  headers = [],
  body = '',
  style = {},
}) => (
  <div
    style={{
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      padding: '5px',
      fontSize: '0.8em',
      ...style,
    }}
  >
    <h3>{title} Headers</h3>
    {headers.length ? null : <span>Headers not available yet</span>}
    {headers.map(([name, value]) => (
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flex: '1 1 150px',
            fontWeight: 'bold',
            textAlign: 'right',
            marginRight: '5px',
          }}
        >
          {name}:
        </div>
        <div style={{ flex: '4 1 200px' }}>{value}</div>
      </div>
    ))}
    {body ? (
      <>
        <h3 style={{ marginTop: '10px' }}>{title} Body</h3>
        <TextArea value={body} rows="4" readOnly />
      </>
    ) : null}
  </div>
);

const XhrRequest = ({ data }) => {
  const {
    method,
    url,
    status,
    statusText,
    createdAt,
    updatedAt = new Date(),
  } = data;
  const [expanded, setExpanded] = useState(false);

  const time = `${String(updatedAt.getHours()).padStart(2, '0')}:${String(
    updatedAt.getMinutes(),
  ).padStart(2, '0')}:${String(updatedAt.getSeconds()).padStart(2, '0')}`;
  const duration = `${(
    updatedAt.getTime() / 1000 -
    createdAt.getTime() / 1000
  ).toFixed(2)}s`;

  useEffect(() => {}, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          paddingRight: '5px',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? (
          <CaretUpFilled style={{ margin: '0 10px' }} />
        ) : (
          <CaretDownFilled style={{ margin: '0 10px' }} />
        )}
        <strong>{method}</strong>
        <div style={{ flex: 1 }}> {url}</div>
        {status ? (
          <div style={{ flex: '0 1 200px' }}>
            {status} {statusText}
          </div>
        ) : (
          <div style={{ flex: '0 1 200px', color: '#999' }}>(pending)</div>
        )}
        <div>{time}</div>
        <div style={{ width: '75px', textAlign: 'right' }}>{duration}</div>
      </div>
      {expanded ? (
        <div style={{ display: 'flex' }}>
          <XhrRequestInfo
            title="Request"
            headers={data.headers}
            body={data.body}
          />
          <XhrRequestInfo
            title="Response"
            headers={data.responseHeaders}
            body={data.responseBody}
            style={{ borderLeft: '1px solid #eee' }}
          />
        </div>
      ) : null}
      <Divider />
    </>
  );
};

const XhrTabPane = ({ list, clear }) => {
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
      {list.map((data, i) => (
        <XhrRequest key={i} data={data} />
      ))}
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
