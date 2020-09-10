import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input, Divider, Typography } from 'antd';
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
    host,
    hostname,
    pathname,
    protocol,
    search,
  } = location;
  const [href, setHref] = useState(baseHref);
  const [hash, setHash] = useState(baseHash);

  useEffect(() => {
    sync();
  }, []);
  useEffect(() => setHref(baseHref), [baseHref]);
  useEffect(() => setHash(baseHash), [baseHash]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 5px',
        }}
      >
        <Button type="primary" onClick={sync}>
          Refresh
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          margin: '10px 5px 5px 0',
        }}
      >
        <div
          style={{
            flex: '0 0 120px',
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
        <Button type="primary" onClick={() => updateHref(href)}>
          Apply
        </Button>
        <Button onClick={() => setHref(baseHref)} disabled={href === baseHref}>
          Revert
        </Button>
      </div>
      <div style={{ paddingLeft: '120px' }}>
        <Text type="warning" style={{ margin: '0 5px' }}>
          <WarningOutlined style={{ marginRight: '5px' }} />
          Updating location or refreshing page may break MessagePort connection
          with this console and you will need to re-open console window when
          page reloads.
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
            flex: '0 0 120px',
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
        <Button type="primary" onClick={() => updateHref(hash)}>
          Apply
        </Button>
        <Button onClick={() => setHash(baseHash)} disabled={hash === baseHash}>
          Revert
        </Button>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          margin: '0 5px 5px 0',
        }}
      >
        <div
          style={{
            flex: '0 0 120px',
            fontWeight: 'bold',
            textAlign: 'right',
            marginRight: '5px',
          }}
        >
          search:
        </div>
        <div style={{ flex: '1', wordBreak: 'break-all' }}>{search}</div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          margin: '0 5px 5px 0',
        }}
      >
        <div
          style={{
            flex: '0 0 120px',
            fontWeight: 'bold',
            textAlign: 'right',
            marginRight: '5px',
          }}
        >
          pathname:
        </div>
        <div style={{ flex: '1', wordBreak: 'break-all' }}>{pathname}</div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          margin: '0 5px 5px 0',
        }}
      >
        <div
          style={{
            flex: '0 0 120px',
            fontWeight: 'bold',
            textAlign: 'right',
            marginRight: '5px',
          }}
        >
          host:
        </div>
        <div style={{ flex: '1', wordBreak: 'break-all' }}>{host}</div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          margin: '0 5px 5px 0',
        }}
      >
        <div
          style={{
            flex: '0 0 120px',
            fontWeight: 'bold',
            textAlign: 'right',
            marginRight: '5px',
          }}
        >
          protocol:
        </div>
        <div style={{ flex: '1', wordBreak: 'break-all' }}>{protocol}</div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          margin: '0 5px 5px 0',
        }}
      >
        <div
          style={{
            flex: '0 0 120px',
            fontWeight: 'bold',
            textAlign: 'right',
            marginRight: '5px',
          }}
        >
          hostname:
        </div>
        <div style={{ flex: '1', wordBreak: 'break-all' }}>{hostname}</div>
      </div>
      <Divider />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 5px',
        }}
      >
        <Button onClick={goBackward}>&lt; Go Back</Button>
        <Button onClick={reload} type="primary">
          Reload Page
        </Button>
        <Button onClick={goForward}>Go Forward &gt;</Button>
      </div>
    </>
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
