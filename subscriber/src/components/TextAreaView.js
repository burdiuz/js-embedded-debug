import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';

const { TextArea } = Input;

export const TextAreaView = ({
  title,
  defaultValue,
  placeholder,
  save,
  cancel,
  saveButtonName,
  cancelButtonName,
  style,
}) => {
  const ref = useRef(null);
  const [currentValue, setCurrentValue] = useState(defaultValue);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref.current]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        ...style,
      }}
    >
      {title ? <h4>&nbsp;{title}</h4> : null}
      <TextArea
        ref={ref}
        value={currentValue}
        placeholder={placeholder}
        readOnly={!saveButtonName}
        onChange={({ target: { value: newValue } }) =>
          setCurrentValue(newValue)
        }
        style={{
          flex: 1,
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          margin: '5px',
        }}
      >
        {saveButtonName ? (
          <Button type="primary" onClick={() => save(currentValue)}>
            {saveButtonName}
          </Button>
        ) : null}
        <Button
          onClick={() => cancel(currentValue)}
          style={{ marginLeft: '5px' }}
        >
          {cancelButtonName}
        </Button>
      </div>
    </div>
  );
};

TextAreaView.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  saveButtonName: PropTypes.string,
  cancelButtonName: PropTypes.string,
  style: PropTypes.shape({}),
};

TextAreaView.defaultProps = {
  title: '',
  defaultValue: '',
  placeholder: '',
  saveButtonName: 'Save',
  cancelButtonName: 'Cancel',
  style: {},
};
