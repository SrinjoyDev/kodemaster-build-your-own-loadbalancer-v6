import express from 'express';
import { Config } from './utils/config';
import { BackendServerDetails } from './backend-server-details';

Config.load(); // Load configuration at startup
//read validated config object >>
const config = Config.getConfig();

const backendServers = config.be_servers.map(
    (server) => new BackendServerDetails(server.domain, server.weight)
);

const app = express();
const PORT = config.lbPORT;

app.get('/', (_req, res) => {
  res.send('Load Balancer v1.0');
});

app.listen(PORT, () => {
  console.log(`load balancer running on port ${config.lbPORT} using ${config.lbAlgo} algorithm`);
  console.log(`initialised backend serverrs : ${backendServers.length}`);
});