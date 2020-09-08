import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from 'antd';

export const Item = ({ name, value, save, remove }) => {
  const [currentValue, setCurrentValue] = useState(value);
  return (
    <div
      style={{
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
        onChange={({ target: { value: newValue } }) =>
          setCurrentValue(newValue)
        }
      />
      <Button type="primary" onClick={() => save(name, currentValue)}>
        Update
      </Button>
      <Button danger onClick={() => remove(name)} style={{ marginLeft: '5px' }}>
        Remove
      </Button>
    </div>
  );
};

Item.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export const NewItem = ({ save }) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        margin: '2px 5px',
      }}
    >
      <Input
        value={name}
        onChange={({ target: { value: newName } }) => setName(newName)}
        style={{ flex: '0 0 25%', marginRight: '10px' }}
      />
      <Input
        value={value}
        onChange={({ target: { value: newValue } }) => setValue(newValue)}
      />
      <Button
        type="primary"
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

export const StorageView = ({ list, save, remove, children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    }}
  >
    {children}
    {list.map(({ key, value }) => (
      <Item key={key} name={key} value={value} save={save} remove={remove} />
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
