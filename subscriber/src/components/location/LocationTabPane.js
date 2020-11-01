import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Divider, Typography } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import {
  locationRead,
  locationSet,
  locationSetHash,
  locationReload,
  locationBackward,
  locationForward,
} from 'store/actions/location';
import { getCurrentLocation } from 'store/selectors/location';

const { Text } = Typography;

const LocationTabPane = ({
  location,
  sync,
  updateHref,
  updateHash,
  reload,
  goBackward,
  goForward,
}) => {
  const {
    href: baseHref,
    hash: baseHash,
  } = location;
  const [href, setHref] = useState(baseHref);
  const [hash, setHash] = useState(baseHash);

  useEffect(() => {
    sync();
  }, []);
  useEffect(() => setHref(baseHref), [baseHref]);
  useEffect(() => setHash(baseHash), [baseHash]);

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      <div
        style={{
          flex: '1 1 400px',
        }}
      ></div>
      <div
        style={{
          flex: '1 0 340px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '10px 5px 5px 0',
          }}
        >
          <div
            style={{
              flex: '0 0 50px',
              fontWeight: 'bold',
              textAlign: 'right',
              marginRight: '5px',
            }}
          >
            href:
          </div>
          <Input
            value={href}
            onChange={({ target: { value } }) => setHref(value)}
          />
          <Button ghost type="primary" onClick={() => updateHref(href)}>
            Apply
          </Button>
        </div>
        <div style={{ paddingLeft: '50px' }}>
          <Text type="warning" style={{ margin: '0 5px' }}>
            <WarningOutlined style={{ marginRight: '5px' }} />
            Updating location or refreshing page may break MessagePort
            connection with this console and you will need to re-open console
            window when page reloads.
          </Text>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            margin: '0 5px 5px 0',
          }}
        >
          <div
            style={{
              flex: '0 0 50px',
              fontWeight: 'bold',
              textAlign: 'right',
              marginRight: '5px',
            }}
          >
            hash:
          </div>
          <Input
            value={hash}
            onChange={({ target: { value } }) => setHash(value)}
          />
          <Button ghost type="primary" onClick={() => updateHash(hash)}>
            Apply
          </Button>
        </div>

        <Divider />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 5px',
          }}
        >
          <Button type="primary" onClick={sync}>
            Sync
          </Button>
          <span>
            <Button onClick={goBackward}>&lt; Back</Button>
            <Button ghost onClick={reload} type="primary">
              Reload
            </Button>
            <Button onClick={goForward}>Forward &gt;</Button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    location: getCurrentLocation(state),
  }),
  {
    sync: locationRead,
    updateHref: locationSet,
    updateHash: locationSetHash,
    reload: locationReload,
    goBackward: locationBackward,
    goForward: locationForward,
  },
)(LocationTabPane);
