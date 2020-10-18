import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Radio, Input } from 'antd';

import { pixelPerfectShowImage } from 'store/actions/pixel-perfect';

const ImageLoad = ({ showImage }) => {
  const [source, setSource] = useState('local');
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <div
      style={{
        flex: '1 0 360px',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 5px 5px 5px',
        border: '1px solid #aaa',
      }}
    >
      <Radio.Group
        value={source}
        size="small"
        onChange={({ target: { value } }) => setSource(value)}
      >
        <Radio.Button value="local">Load local file</Radio.Button>
        <Radio.Button value="url">Load from URL</Radio.Button>
        <Radio.Button value="base64">Load Base64 string</Radio.Button>
      </Radio.Group>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 100%',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5px',
        }}
      >
        {source === 'local' ? (
          <input
            type="file"
            placeholder="Provide Image file"
            accept=".jpg,.jpeg,.png,.gif,.jiff,.webp"
            onChange={({ target: { files } }) => {
              const file = files[0];
              if (!file) {
                return;
              }

              const reader = new FileReader();
              reader.onload = () => {
                showImage(reader.result);
              };

              reader.readAsDataURL(file);
            }}
          />
        ) : null}
        {source === 'url' ? (
          <div style={{ display: 'flex', width: '96%' }}>
            <Input
              value={value}
              placeholder="Provide Image URL"
              onChange={({ target }) => setValue(target.value)}
            />
            <Button
              disabled={!value}
              style={{ marginLeft: '5px' }}
              onClick={() => {
                setLoading(true);
                const reader = new FileReader();
                reader.onload = () => {
                  showImage(reader.result);
                  setLoading(false);
                };

                fetch(value)
                  .then((response) => response.blob())
                  .then((blob) => reader.readAsDataURL(blob));
              }}
            >
              Load Image
            </Button>
          </div>
        ) : null}
        {source === 'base64' ? (
          <>
            <Input.TextArea
              value={value}
              placeholder="Provide Base64 Image source"
              style={{ flex: 1, width: '100%', height: '100%' }}
              onChange={({ target }) => setValue(target.value)}
            />
            <Button
              disabled={!value}
              style={{ alignSelf: 'flex-end', marginTop: '5px' }}
              onClick={() => showImage(value)}
            >
              Load Image
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default connect(null, {
  showImage: pixelPerfectShowImage,
})(ImageLoad);
