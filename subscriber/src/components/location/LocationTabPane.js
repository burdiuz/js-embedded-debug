import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Divider, Typography } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { locationRead } from 'store/actions/location';
import { getCurrentLocation } from 'store/selectors/location';

const { Text } = Typography;

const LocationTabPane = ({ location, sync }) => {
  useEffect(() => {
    sync();
  }, []);
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
      <span>Work in progress...</span>
      <Divider />
      <Text type="warning" style={{ margin: '0 5px' }}>
        <WarningOutlined style={{ marginRight: '5px' }} />
        Updating location or refreshing page may break MessagePort connection
        with this console and you will need to re-open console window when page
        reloads.
      </Text>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '0 5px',
        }}
      >
        <Input placeholder="Enter URL" style={{ flex: 1 }} />
        <Button type="primary" style={{ marginRight: '20px' }}>
          Apply URL
        </Button>
        <Button>&lt; Go Back</Button>
        <Button type="primary">Refresh Page</Button>
        <Button>Go Forward &gt;</Button>
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
  },
)(LocationTabPane);
