import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

const { TextArea } = Input;

const commands = [];
let commandIndex = 0;

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
            switch (keyCode) {
              case 13:
                onSend(text);
                setText('');
                commands.push(text);
                commandIndex = commands.length;
                break;
              case 38:
                if (commands.length) {
                  commandIndex =
                    commandIndex <= 0 ? commands.length - 1 : commandIndex - 1;
                  setText(commands[commandIndex]);
                }
                break;
              case 40:
                if (commands.length) {
                  commandIndex =
                    commandIndex >= commands.length - 1 ? 0 : commandIndex + 1;
                  setText(commands[commandIndex]);
                }
                break;
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
