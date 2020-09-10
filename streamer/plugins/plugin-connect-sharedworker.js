((EDConsole) => {
  if (window.SharedWorker) {
    const worker = new SharedWorker(WORKER_PATH);

    const subscriber = {
      postMessage: (data) => worker.port.postMessage(data),
      addEventListener: (...args) => worker.port.addEventListener(...args),
      worker,
    };

    addSubscriber(subscriber);
    initializeAPI(subscriber);

    worker.port.start();
  }
})(window.EDConsole);
