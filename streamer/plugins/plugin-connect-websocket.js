((EDConsole) => {
  if (typeof WebSocket !== 'undefined') {
    socket = new WebSocket('ws://localhost:8887/provide');

    socket.addEventListener('message', ({ data }) => parseIncomingMessage(data));
    socket.addEventListener('close', (event) =>
      console.log('Socket connection closed unexpectedly:', event)
    );
  }
})(window.EDConsole);
