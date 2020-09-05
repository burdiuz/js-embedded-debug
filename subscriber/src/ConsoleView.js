import React, { memo, useState, useEffect, useRef } from 'react';
import * as DOMConsole from '@actualwave/dom-console';

const ConsoleView = memo(() => {
  const [msg, setMsg] = useState(null);
  const container = useRef();

  useEffect(() => {
    if (!msg) {
      const msgInst = DOMConsole.create(container.current);
      msgInst.info('Console started...');
      setMsg(msgInst);
    }
  });

  return <div ref={container} className="console-view-container" />;
});

export default ConsoleView;
