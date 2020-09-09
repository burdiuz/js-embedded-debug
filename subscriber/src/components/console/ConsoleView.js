import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import * as DOMConsole from '@actualwave/dom-console';

const ConsoleView = memo(({ onInit }) => {
  const [msg, setMsg] = useState(null);
  const container = useRef();

  useEffect(() => {
    if (!msg) {
      const msgInst = DOMConsole.create(container.current);
      setMsg(msgInst);
      onInit(msgInst);
    }
  }, [msg, onInit]);

  return (
    <div style={{ position: 'relative' }}>
      <div ref={container} className="console-view-container" />
      <Button
        onClick={() =>
          (container.current.querySelector('.ui-console-container').innerHTML =
            '')
        }
        style={{ position: 'absolute', top: '5px', right: '5px', zIndex: 10 }}
      >
        Clear
      </Button>
    </div>
  );
});

ConsoleView.propTypes = {
  onInit: PropTypes.func.isRequired,
};

export default ConsoleView;
