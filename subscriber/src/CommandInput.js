import React, { useState } from 'react';
import { Input, Button } from 'antd';

const { TextArea } = Input;

const CommandInput = ({ onExecute }) => {
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
                onExecute(text);
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
                onExecute(text);
                setText('');
              }}
              style={{ cursor: 'pointer' }}
            >
              Execute
            </span>
          }
          onChange={({ target: { value } }) => setText(value)}
        />
      )}
    </div>
  );
};

export default CommandInput;
