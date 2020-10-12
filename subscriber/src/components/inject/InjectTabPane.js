import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Input, Radio, Divider } from 'antd';

import {
  injectionAdd,
  injectionRemove,
  injectionExecute,
  injectionsClear,
} from 'store/actions/injections';

import { getInjectionList } from 'store/selectors/injections';

const Type = {
  JS: 'js',
  CSS: 'css',
  HTML: 'html',
};

const Target = {
  HEAD: 'HEAD',
  BODY: 'BODY',
  SELECTOR: 'Selector',
};

const Operation = {
  APPEND: 'Append',
  PREPEND: 'Prepend',
  REPLACE: 'Replace',
  CONTENT: 'Content',
};

const InjectionAdd = ({ execute, save, cancel }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('js');
  const [target, setTarget] = useState('body');
  const [operation, setOperation] = useState('append');
  const [query, setQuery] = useState('');
  const [data, setData] = useState('');

  return (
    <div
      style={{
        postion: 'absolute',
        display: 'flex',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        padding: '5px',
        flexDirection: 'column',
        alignItems: 'stretch',
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '5px',
        }}
      >
        <h3>
          Add &nbsp;
          <Radio.Group
            size="small"
            value={type}
            onChange={({ target: { value } }) => setType(value)}
          >
            <span title="Insert SVRIPT tag with JavaScript data">
              <Radio.Button value={Type.JS}>JS</Radio.Button>
            </span>
            <span title="Insert STYLE tag with CSS data">
              <Radio.Button value={Type.CSS}>CSS</Radio.Button>
            </span>
            <span title="Insert HTML content as is">
              <Radio.Button value={Type.HTML}>HTML</Radio.Button>
            </span>
          </Radio.Group>
          &nbsp; Injection
        </h3>
        <Input
          size="small"
          placeholder="Injection title is optional but helps when displaying it in the list"
          value={title}
          onChange={({ target: { value } }) => setTitle(value)}
          style={{ flex: 1, margin: '0 5px' }}
        />
        Injection target: &nbsp;
        <Radio.Group
          size="small"
          value={target}
          onChange={({ target: { value } }) => setTarget(value)}
        >
          <span title="Insert into HEAD tag">
            <Radio.Button value={Target.HEAD}>HEAD</Radio.Button>
          </span>
          <span title="Insert into BODY tag">
            <Radio.Button value={Target.BODY}>BODY</Radio.Button>
          </span>
          <span title="Insert data using selector">
            <Radio.Button value={Target.SELECTOR}>Selector</Radio.Button>
          </span>
        </Radio.Group>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '5px',
        }}
      >
        {target === Target.SELECTOR ? (
          <Input
            size="small"
            placeholder="CSS Query that points to injection target"
            value={query}
            onChange={({ target: { value } }) => setQuery(value)}
            style={{ flex: 1, marginRight: '5px' }}
          />
        ) : null}
        <Radio.Group
          size="small"
          value={operation}
          onChange={({ target: { value } }) => setOperation(value)}
        >
          <span title="Append data in selected container">
            <Radio.Button value={Operation.APPEND}>Append</Radio.Button>
          </span>
          <span title="Prepend data in selected container">
            <Radio.Button value={Operation.PREPEND}>Prepend</Radio.Button>
          </span>
          <span title="Replace selected container with injected data">
            <Radio.Button value={Operation.REPLACE}>Replace</Radio.Button>
          </span>
          <span title="Replace selected target content with ijected data">
            <Radio.Button value={Operation.CONTENT}>Content</Radio.Button>
          </span>
        </Radio.Group>
      </div>
      <Input.TextArea
        placeholder="Injection data"
        style={{ flex: 1 }}
        value={data}
        onChange={({ target: { value } }) => setData(value)}
      ></Input.TextArea>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '5px',
        }}
      >
        <Button
          type="primary"
          onClick={() => save({ title, type, target, operation, query, data })}
        >
          Execute &amp; Save
        </Button>
        <Button
          style={{ margin: '0 5px' }}
          onClick={() =>
            execute({ title, type, target, operation, query, data })
          }
        >
          Execute
        </Button>
        <Button onClick={cancel}>Cancel</Button>
      </div>
    </div>
  );
};

const InjectionList = ({ list, add, execute, remove }) => {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: '100%',
        height: '100%',
        padding: '5px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          flex: 1,
          overflowY: 'auto',
        }}
      >
        {list.length ? null : 'No injections stored, please add one.'}
        {list.map((item, index) => {
          const { title, type, target, operation, query, data } = item;

          return (
            <>
              <div
                key={`${index}/${title}/${type}${target}${operation}`}
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <div
                  style={{
                    fontSize: '2rem',
                    flex: '0 0 100px',
                    textTransform: 'uppercase',
                  }}
                >
                  {type}
                </div>
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    overflowX: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflowX: 'hidden',
                    }}
                  >
                    {target} / {operation} {query ? `/ ${query}` : null}
                  </div>
                  <div
                    style={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflowX: 'hidden',
                    }}
                  >
                    {title || data.substr(0, 100)}
                  </div>
                </div>
                <Button
                  type="primary"
                  ghost
                  style={{ margin: '0 5px' }}
                  onClick={() => execute(item)}
                >
                  Execute
                </Button>
                <Button danger onClick={() => remove(index)}>
                  Remove
                </Button>
              </div>
              <Divider />
            </>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="primary" onClick={add}>
          Add Injection
        </Button>
        <Button danger style={{ marginLeft: '5px' }} disabled={!list.length}>
          Clear
        </Button>
      </div>
    </div>
  );
};

const InjectTabPane = ({ list, add, remove, execute, clear }) => {
  const [adding, setAdding] = useState(false);

  if (adding) {
    return (
      <InjectionAdd
        save={(injection) => {
          add(injection);
          setAdding(false);
        }}
        execute={(injection) => {
          execute(injection);
          setAdding(false);
        }}
        cancel={() => setAdding(false)}
      />
    );
  }

  return (
    <InjectionList
      list={list}
      add={() => setAdding(true)}
      remove={remove}
      execute={execute}
      clear={clear}
    />
  );
};

export default connect(
  (state) => ({
    list: getInjectionList(state),
  }),
  {
    add: injectionAdd,
    remove: injectionRemove,
    execute: injectionExecute,
    clear: injectionsClear,
  },
)(InjectTabPane);
