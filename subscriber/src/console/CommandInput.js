import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

const { TextArea } = Input;

const CommandInput = ({ onSend }) => {
  const [text, setText] = useState('');
  const [multi, setMulti] = useState(false);

  return (
    <div className="console-input-container">
      {multi ? (
        <>
          <TextArea
            value={text}
            rows="4"
            onChange={({ target: { value } }) => setText(value)}
          />
          <div style={{ width: '100%', textAlign: 'right', marginTop: '5px' }}>
            <Button onClick={() => setMulti(false)}>Single line</Button>
            <Button
              onClick={() => {
                onSend(text);
                setText('');
              }}
              style={{ marginLeft: '10px' }}
            >
              Execute
            </Button>
          </div>
        </>
      ) : (
        <Input
          value={text}
          placeholder="Enter your command"
          addonBefore={
            <span onClick={() => setMulti(true)} style={{ cursor: 'pointer' }}>
              \n
            </span>
          }
          addonAfter={
            <span
              onClick={() => {
                onSend(text);
                setText('');
              }}
              style={{ cursor: 'pointer' }}
            >
              Execute
            </span>
          }
          onChange={({ target: { value } }) => setText(value)}
          onKeyUp={({ keyCode }) => {
            if (keyCode === 13) {
              onSend(text);
              setText('');
            }
          }}
        />
      )}
    </div>
  );
};

CommandInput.propTypes = {
  onSend: PropTypes.func.isRequired,
};

export default CommandInput;
