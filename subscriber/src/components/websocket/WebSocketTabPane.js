import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Divider, Input } from 'antd';
import {
  CaretDownFilled,
  CaretRightFilled,
  CaretLeftOutlined,
  CaretRightOutlined,
} from '@ant-design/icons';
import { websocketInfoClear } from 'store/actions/websockets';
import {
  getWebsocketList,
  getWebsocketMessages,
} from 'store/selectors/websockets';

const STATES = ['Connecting', 'Opened', 'Closing', 'Closed'];

const MessageType = {
  INCOMING: 'incoming',
  OUTGOING: 'outgoing',
};

const WebSocketFrame = ({ message: { type, data } }) => (
  <div
    style={{
      display: 'flex',
      marginLeft: type === MessageType.INCOMING ? '20px' : '40px',
    }}
  >
    {type === MessageType.INCOMING ? (
      <CaretLeftOutlined style={{ color: 'red', margin: '10px' }} />
    ) : null}
    <div
      style={{
        flex: 1,
        padding: '5px',
        margin: '5px',
        border: '1px solid #eeeeee',
        borderRadius: '5px',
        fontSize: '0.8em',
      }}
    >
      <pre>{data}</pre>
    </div>
    {type === MessageType.OUTGOING ? (
      <CaretRightOutlined style={{ color: 'green', margin: '10px' }} />
    ) : null}
  </div>
);

const WebSocketView = ({ data, messages }) => {
  const { url, state, createdAt, updatedAt = new Date() } = data;
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
        <div style={{ flex: 1 }}> {url}</div>
        <div style={{ flex: '0 1 200px' }}>{STATES[state]}</div>
        <div>{time}</div>
        <div style={{ width: '75px', textAlign: 'right' }}>{duration}</div>
      </div>
      {expanded ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
          }}
        >
          {messages.length ? null : (
            <div style={{ margin: '20px' }}>No messages were captured.</div>
          )}
          {messages.map((frame, i) => (
            <WebSocketFrame key={i} message={frame} />
          ))}
        </div>
      ) : null}
      <Divider />
    </>
  );
};

const WebSocket = connect((state, { data }) => ({
  messages: getWebsocketMessages(state, data),
}))(WebSocketView);

const WebSocketTabPane = ({ list, clear }) => {
  return (
    <div
      style={{
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 5px 10px 0',
        }}
      >
        <Button type="primary" disabled={!list.length} onClick={clear}>
          Clear
        </Button>
      </div>
      {list.length ? null : (
        <div style={{ margin: '20px' }}>No new WebSockets were captured.</div>
      )}
      {list.map((data, i) => (
        <WebSocket key={i} data={data} />
      ))}
    </div>
  );
};

export default connect(
  (state) => ({
    list: getWebsocketList(state),
  }),
  {
    clear: websocketInfoClear,
  },
)(WebSocketTabPane);
