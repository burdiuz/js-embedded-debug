import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Radio, Select, Input } from 'antd';
import { evalCommandSend } from 'store/actions/command';
import { textdataSet } from 'store/actions/textdata';

import { NewItem, StorageView } from '../StorageView';

const { Option } = Select;
const { TextArea } = Input;

const s = (...args) => JSON.stringify(...args);

const generateXmlHttpRequest = (method, url, headers, body) => `(() => {
  const req = new XmlHttpRequest();
  ${headers
    .map(({ key, value }) => `req.setRequestHeader(${s(key)}, ${s(value)})`)
    .join('\n')}
  req.open(${s(method)}, ${s(url)});
  req.send(${body ? s(body) : ''});
  return req;
})()`;

const generateFetch = (method, url, headers, body) => `fetch(${s(url)}, {
  method: ${s(method)},
  headers: ${s(
    headers.reduce((res, { key, value }) => ({ ...res, [key]: value }), {}),
    null,
    2,
  )},
  body: ${body ? s(body) : 'undefined'},
})`;

const generateCode = ({ type, method, url, headers, body }) => {
  const fn = type === 'fetch' ? generateFetch : generateXmlHttpRequest;

  return fn(method, url, headers, body);
};

const NewXhrRequest = ({ data, send, cancel, disaplyCode }) => {
  const [type, setType] = useState('fetch');
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState([]);
  const [body, setBody] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!data) {
      return;
    }

    setType(data.type || 'fetch');
    setMethod(data.method || 'GET');
    setUrl(data.url || '');
    setHeaders(
      data.headers ? data.headers.map(([key, value]) => ({ key, value })) : [],
    );
    setBody(data.body || '');
    console.log(data);
  }, [data]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'stretch',
        overflowY: 'auto',
      }}
    >
      <h4>Send XHR Request</h4>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Radio.Group
          value={type}
          onChange={({ target: { value } }) => setType(value)}
        >
          <Radio.Button value="fetch">fetch()</Radio.Button>
          <Radio.Button value="xhr">XmlHttpRequest</Radio.Button>
        </Radio.Group>
        <Select
          value={method}
          onChange={(value) => setMethod(value)}
          style={{ width: 110, margin: '0 5px' }}
          placeholder="HTTP method"
          optionFilterProp="children"
        >
          <Option value="GET">GET</Option>
          <Option value="POST">POST</Option>
          <Option value="PUT">PUT</Option>
          <Option value="DELETE">DELETE</Option>
          <Option value="PATCH">PATCH</Option>
          <Option value="HEAD">HEAD</Option>
          <Option value="CONNECT">CONNECT</Option>
          <Option value="OPTIONS">OPTIONS</Option>
        </Select>
        <Input
          value={url}
          onChange={({ target: { value } }) => setUrl(value)}
          placeholder="Request URL"
          style={{ flex: 1 }}
        />
      </div>
      <strong>Request Headers</strong>
      <StorageView
        list={headers}
        size="small"
        save={(name, value, index) => {
          const newList = [...headers];
          newList[index] = { name, value };

          setHeaders(newList);
        }}
        remove={(name, index) => {
          const newList = [...headers];
          newList.splice(index, 1);

          setHeaders(newList);
        }}
        style={{
          height: undefined,
          overflowY: undefined,
        }}
      />
      <NewItem
        size="small"
        save={(key, value) => setHeaders([...headers, { key, value }])}
      />
      <div style={{ display: 'flex', marginTop: '5px' }}>
        <strong>Request Body</strong>
        <Button type="link" size="small" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      <TextArea
        value={body}
        onChange={({ target: { value } }) => setBody(value)}
        rows={expanded ? 15 : 2}
        placeholder="HTTP Request Body"
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '5px',
        }}
      >
        <Button
          type="primary"
          onClick={() =>
            send(
              generateCode({
                type,
                method,
                url,
                headers,
                body,
              }),
            )
          }
        >
          Send
        </Button>
        <Button
          onClick={() => {
            disaplyCode({
              title: 'Generated Request Code',
              data: generateCode({
                type,
                method,
                url,
                headers,
                body,
              }),
            });
          }}
          style={{ margin: '0 5px' }}
        >
          Generate Code
        </Button>
        <Button onClick={cancel}>Close</Button>
      </div>
    </div>
  );
};

export default connect(null, {
  send: evalCommandSend,
  disaplyCode: textdataSet,
})(NewXhrRequest);
