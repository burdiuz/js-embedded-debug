import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Divider, Breadcrumb } from 'antd';
import { AimOutlined, CheckOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import {
  domNodeLookup,
  domQuerySelector,
  domNodeSetAttribute,
  domNodeSetStyle,
  domNodeComputedStyle,
  domNodeCopyQuery,
  domNodeCopyHtml,
  domNodeCopyText,
  domNodeAssignVariable,
} from 'store/actions/domelement';
import {
  getCurrentDomelementSelectors,
  getCurrentDomelementAttributes,
  getCurrentDomelementStyles,
  getCurrentDomelementName,
  getDomelementComputedStyles,
  getCurrentDomelementDimensions,
  getCurrentDomelementVariableName,
} from 'store/selectors/domelement';

import { NewItem } from '../StorageView';

const Prop = ({ name, value: baseValue, change }) => {
  const [value, setValue] = useState(baseValue);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [edit]);

  useEffect(() => {
    setEdit(false);
    setValue(baseValue);
  }, [baseValue]);

  return (
    <div
      style={{ display: 'flex', height: '24px', flex: '0 0 24px' }}
      onClick={() => setEdit(true)}
    >
      <div
        style={{
          flex: '1 1 150px',
          fontWeight: 'bold',
          textAlign: 'right',
          marginRight: '5px',
          whiteSpace: 'nowrap',
        }}
      >
        {name}:
      </div>
      <div style={{ flex: '4 1 200px', display: 'flex', position: 'relative' }}>
        {edit ? (
          <>
            <Input
              ref={inputRef}
              value={value}
              size="small"
              onChange={({ target: { value } }) => setValue(value)}
              onPressEnter={() => {
                setEdit(false);

                if (value !== baseValue) {
                  change([name, value]);
                }
              }}
            />
            <Button
              icon={<CheckOutlined />}
              size="small"
              onMouseUp={() => {
                setEdit(false);

                if (value !== baseValue) {
                  change([name, value]);
                }
              }}
            />
          </>
        ) : (
          <div
            style={{
              position: 'absolute',
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {value}
          </div>
        )}
      </div>
    </div>
  );
};

// <NewItem save={() => null} style={{ flex: 1 }} />

const PropListInfo = ({
  title,
  list,
  change,
  style = {},
  emptyMessage = 'Not available',
  children = null,
}) => (
  <div
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      ...style,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <h3 style={{ flex: 1 }}>{title}</h3>
      {children}
    </div>
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        overflowY: 'auto',
      }}
    >
      <NewItem
        size="small"
        nameFlex="1 1 150px"
        valueFlex="4 1 200px"
        save={(key, value) => change([key, value])}
        style={{ height: '24px', flex: '0 0 24px' }}
      />
      {list.length ? '' : emptyMessage}
      {list.map(([name, value]) => (
        <Prop key={name} name={name} value={value} change={change} />
      ))}
    </div>
  </div>
);

const ElementTabPane = ({
  selectors,
  attributes,
  styles,
  width,
  height,
  x,
  y,
  variable,
  computedStyles,
  name,
  lookup,
  querySelector,
  setAttribute,
  setStyle,
  loadComputedStyle,
  copyQuery,
  copyHtml,
  copyText,
  assignVar,
}) => {
  const selector = selectors.join(' > ');
  const [query, setQuery] = useState('');
  const [showComputed, setShowComputed] = useState(false);

  useEffect(() => {
    setShowComputed(false);
  }, [selectors.join(' ')]);

  useEffect(() => {
    if (showComputed) {
      loadComputedStyle(selector);
    }
  }, [showComputed]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        margin: '0 5px',
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button style={{ marginRight: '20px' }} onClick={lookup}>
          <AimOutlined />
          Select
        </Button>
        <Input
          value={query}
          size="middle"
          placeholder="Enter CSS Selector path"
          onChange={({ target: { value } }) => setQuery(value)}
          style={{ width: '100%' }}
        />
        <Button type="primary" onClick={() => querySelector(query)}>
          Query
        </Button>
      </div>
      <Divider />
      {selector ? (
        <>
          <Breadcrumb style={{ marginDown: '10px' }}>
            {selectors.map((item, index) => (
              <Breadcrumb.Item key={index}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    querySelector(selectors.slice(0, index + 1).join(' > '));
                  }}
                >
                  {item}
                </a>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <strong>Dimensions:&nbsp;</strong>
            {width} x {height}
            <strong>&nbsp;Position:&nbsp;</strong>
            {x} x {y}
            &nbsp;
            {variable ? (
              <>
                <strong>Assigned to:&nbsp;</strong>
                {variable}
              </>
            ) : (
              <Button type="link" size="small" onClick={assignVar}>
                Assign Variable
              </Button>
            )}
            <div style={{ flex: 1 }}></div>
            <Button
              onClick={copyQuery}
              size="small"
              style={{ marginRight: '5px' }}
            >
              Copy CSS Query
            </Button>
            <Button
              onClick={copyHtml}
              size="small"
              style={{ marginRight: '5px' }}
            >
              Copy Element HTML
            </Button>
            <Button onClick={copyText} size="small">
              Copy Element Text
            </Button>
          </div>
          <div
            style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}
          >
            <PropListInfo
              title="Attributes"
              list={attributes}
              emptyMessage="Does not have any attributes."
              style={{ marginRight: '5px' }}
              change={(prop) => setAttribute(selector, prop)}
            />
            <PropListInfo
              title="Styles"
              list={showComputed ? computedStyles : styles}
              emptyMessage="Does not have any direct style rules."
              style={{ borderLeft: '1px solid #eee' }}
              change={(prop) => setStyle(selector, prop)}
            >
              {showComputed ? (
                <>
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      setShowComputed(false);
                    }}
                  >
                    Direct
                  </a>
                  &nbsp;/&nbsp;Computed
                </>
              ) : (
                <>
                  Direct&nbsp;/&nbsp;
                  <a
                    href="#"
                    onClick={(event) => {
                      event.preventDefault();
                      setShowComputed(true);
                    }}
                  >
                    Computed
                  </a>
                </>
              )}
            </PropListInfo>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default connect(
  (state) => ({
    selectors: getCurrentDomelementSelectors(state),
    attributes: getCurrentDomelementAttributes(state),
    styles: getCurrentDomelementStyles(state),
    name: getCurrentDomelementName(state),
    computedStyles: getDomelementComputedStyles(state),
    variable: getCurrentDomelementVariableName(state),
    ...getCurrentDomelementDimensions(state),
  }),
  (dispatch) => ({
    lookup: () => dispatch(domNodeLookup()),
    querySelector: (query) => dispatch(domQuerySelector(query)),
    setAttribute: (selector, prop) =>
      dispatch(domNodeSetAttribute({ selector, prop })),
    setStyle: (selector, prop) => dispatch(domNodeSetStyle({ selector, prop })),
    loadComputedStyle: (selector) =>
      dispatch(domNodeComputedStyle({ selector })),
    copyQuery: () => dispatch(domNodeCopyQuery()),
    copyHtml: () => dispatch(domNodeCopyHtml()),
    copyText: () => dispatch(domNodeCopyText()),
    assignVar: () => dispatch(domNodeAssignVariable()),
  }),
)(ElementTabPane);
