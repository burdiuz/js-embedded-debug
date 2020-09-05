const clients = [];

const handleBroadcast = ({ data }) =>
  clients.forEach((client) => client.postMessage(data));

self.onconnect = ({ ports }) => {
  const client = ports[0];

  clients.push(client);

  client.addEventListener('message', handleBroadcast);
  client.start();
};
