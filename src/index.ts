import * as http from 'http';

import { SocketService } from './services';
import { config } from './config';
import { app } from './app';

const server = http.createServer(app);
export const socketService = new SocketService(server)

server.listen(config.PORT, () => {

  console.log(`Listen ${config.PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(0);
  });
});

process.on('uncaughtException', error => {
  console.log(error);
});
process.on('unhandledRejection', error => {
  console.log(error);
});