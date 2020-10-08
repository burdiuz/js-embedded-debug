import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Input } from 'antd';
import { CaretDownFilled, CaretRightFilled } from '@ant-design/icons';

const { TextArea } = Input;

const State = {
  OPENED: 1,
  LOADING: 3,
  DONE: 4,
};

const getStateString = (state) => {
  switch (state) {
    case State.OPENED:
      return '(opened)';
    case State.LOADING:
      return '(loading)';
    case State.DONE:
      return '(done)';
    default:
      return `(pending?${state})`;
  }
};

const XhrRequestInfo = ({
  title,
  headers,
  body = '',
  bodyType = '',
  style = {},
  children,
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
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h3>{title} Headers</h3>
      <span>{children}</span>
    </div>
    {headers.length ? null : <span>Headers not available yet</span>}
    {headers.map(([name, value], index) => (
      <div key={index} style={{ display: 'flex' }}>
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
        <div style={{ flex: '4 1 200px', wordBreak: 'break-word' }}>
          {value}
        </div>
      </div>
    ))}
    {body ? (
      <>
        <h3 style={{ marginTop: '10px' }}>
          {title} Body {bodyType ? ` ( ${bodyType} )` : ''}
        </h3>
        <TextArea value={body} rows="4" readOnly />
      </>
    ) : null}
  </div>
);

const XhrRequest = ({ data, replay }) => {
  const {
    type,
    method,
    url,
    status,
    statusText,
    createdAt,
    state,
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
          <CaretDownFilled style={{ margin: '0 10px' }} />
        ) : (
          <CaretRightFilled style={{ margin: '0 10px' }} />
        )}
        <strong>{method}</strong>
        <div style={{ flex: 1, marginLeft: '5px' }}>
          <sup style={{ color: '#aaaaaa' }}>{type}</sup>
          &nbsp;{url}
        </div>
        {status ? (
          <div style={{ flex: '0 1 200px' }}>
            {status} {statusText}
          </div>
        ) : (
          <div style={{ flex: '0 1 200px', color: '#999' }}>
            {getStateString(state)}
          </div>
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
          >
            <Button type="link" size="small" onClick={() => replay(data)}>
              Replay
            </Button>
          </XhrRequestInfo>
          <XhrRequestInfo
            title="Response"
            headers={data.responseHeaders}
            body={data.responseText}
            bodyType={data.responseType}
            style={{ borderLeft: '1px solid #eee' }}
          />
        </div>
      ) : null}
      <Divider />
    </>
  );
};

export default XhrRequest;
