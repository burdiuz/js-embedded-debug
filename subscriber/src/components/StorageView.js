import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';

export const Item = memo(({ index, name, value, size, save, remove }) => {
  const [currentValue, setCurrentValue] = useState(value);
  return (
    <div
      style={{
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        margin: '2px 5px',
      }}
    >
      <label
        style={{ flex: '0 0 25%', textAlign: 'right', marginRight: '10px' }}
      >
        {name}
      </label>
      <Input
        value={currentValue}
        size={size}
        onChange={({ target: { value: newValue } }) =>
          setCurrentValue(newValue)
        }
      />
      <Button
        ghost
        type="primary"
        size={size}
        onClick={() => save(name, currentValue, index)}
        style={{ margin: '0 5px' }}
      >
        Update
      </Button>
      <Button
        danger
        size={size}
        onClick={() => remove(name, index)}
      >
        Remove
      </Button>
    </div>
  );
});

Item.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export const NewItem = ({
  save,
  style,
  nameFlex = '0 0 25%',
  valueFlex = undefined,
  size = 'normal',
}) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        margin: '2px 5px',
        ...(style || {}),
      }}
    >
      <Input
        value={name}
        size={size}
        placeholder="Name"
        onChange={({ target: { value: newName } }) => setName(newName)}
        style={{ flex: nameFlex, marginRight: '10px' }}
      />
      <Input
        value={value}
        size={size}
        placeholder="Value"
        onChange={({ target: { value: newValue } }) => setValue(newValue)}
        style={{ flex: valueFlex }}
      />
      <Button
        type="primary"
        size={size}
        onClick={() => {
          save(name, value);
          setName('');
          setValue('');
        }}
      >
        Add
      </Button>
    </div>
  );
};

NewItem.propTypes = {
  save: PropTypes.func.isRequired,
};

export const StorageView = ({
  list,
  save,
  remove,
  children,
  size = 'normal',
  style = {},
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      height: '100%',
      overflowY: 'auto',
      ...style,
    }}
  >
    {children}
    {list.map(({ key, value }, index) => (
      <Item
        index={index}
        key={`${index}${key}`}
        name={key}
        value={value}
        save={save}
        remove={remove}
        size={size}
      />
    ))}
  </div>
);

StorageView.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  save: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  children: PropTypes.node,
};
