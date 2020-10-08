import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

import { commandHistoryAdd } from 'store/actions/command';
import { getCommandHistory } from 'store/selectors/command';

const { TextArea } = Input;

const CommandInput = ({ history, send }) => {
  const [text, setText] = useState('');
  const [commandIndex, setCommandIndex] = useState(0);
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
              disabled={!text}
              onClick={() => {
                send(text);
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
                if (!text) {
                  return;
                }

                send(text);
                setText('');
              }}
              style={{ cursor: 'pointer', color: text ? '#000' : '#999' }}
            >
              Execute
            </span>
          }
          onChange={({ target: { value } }) => setText(value)}
          onKeyUp={({ keyCode }) => {
            switch (keyCode) {
              case 13:
                if (!text) {
                  return;
                }

                send(text);
                setText('');
                setCommandIndex(history.length + 1);
                break;
              case 38:
                if (history.length) {
                  setCommandIndex(
                    commandIndex <= 0 ? history.length - 1 : commandIndex - 1,
                  );
                  setText(history[commandIndex]);
                }
                break;
              case 40:
                if (history.length) {
                  setCommandIndex(
                    commandIndex >= history.length - 1 ? 0 : commandIndex + 1,
                  );
                  setText(history[commandIndex]);
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
  send: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    history: getCommandHistory(state),
  }),
  (dispatch, { send }) => ({
    send: (text) => {
      send(text);
      dispatch(commandHistoryAdd(text));
    },
  }),
)(CommandInput);
