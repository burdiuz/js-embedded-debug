import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Divider, Breadcrumb } from 'antd';
import { AimOutlined, CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import {
  domNodeLookup,
  domQuerySelector,
  domNodeSetAttribute,
  domNodeSetStyle,
  domNodeComputedStyle,
} from 'store/actions/domelement';
import {
  getCurrentDomelementSelectors,
  getCurrentDomelementAttributes,
  getCurrentDomelementStyles,
  getCurrentDomelementName,
  getDomelementComputedStyles,
  getCurrentDomelementDimensions,
} from 'store/selectors/domelement';

const Prop = ({ name, value: baseValue, change }) => {
  const [value, setValue] = useState(baseValue);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [edit]);

  return (
    <div style={{ display: 'flex' }} onClick={() => setEdit(true)}>
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
      <div style={{ flex: '4 1 200px' }}>
        {edit ? (
          <Input
            ref={inputRef}
            value={value}
            size="small"
            onChange={({ target: { value } }) => setValue(value)}
            onPressEnter={() => {
              if (value !== baseValue) {
                change([name, value]);
              }
              setEdit(false);
            }}
            addonAfter={
              <CheckOutlined
                onClick={() => {
                  if (value !== baseValue) {
                    change([name, value]);
                  }
                  setEdit(false);
                }}
              />
            }
          />
        ) : (
          value
        )}
      </div>
    </div>
  );
};

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
  computedStyles,
  name,
  lookup,
  querySelector,
  setAttribute,
  setStyle,
  loadComputedStyle,
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
            <Button
              icon={<CopyOutlined />}
              size="small"
              style={{ marginRight: '10px' }}
              onClick={() => navigator.clipboard.writeText(selector)}
            />
            {selectors.map((item, index) => (
              <Breadcrumb.Item key={index}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    querySelector(selectors.slice(0, index + 1).join(' '));
                  }}
                >
                  {item}
                </a>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div>
            <strong>Dimensions:&nbsp;</strong>
            {width} x {height}
            <strong>&nbsp;Position:&nbsp;</strong>
            {x} x {y}
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
  }),
)(ElementTabPane);
