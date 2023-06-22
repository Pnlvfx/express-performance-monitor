import { Server, Socket } from 'socket.io';
import { ValidExpressStatusConfig } from '../types/config';
import { ExpressServer } from '../types/request';
import { gatherOsMetrics } from './gather-os-metrics';
let io: Server;

const addSocketEvents = (socket: Socket, config: ValidExpressStatusConfig) => {
  socket.emit('esm_start', config.spans);
  socket.on('esm_change', () => {
    socket.emit('esm_start', config.spans);
  });
};

export const socketIoInit = (server: ExpressServer, config: ValidExpressStatusConfig) => {
  if (io === null || io === undefined) {
    if (config.websocket) {
      io = config.websocket;
    } else {
      io = new Server(server);
    }

    io.on('connection', (socket: Socket) => {
      addSocketEvents(socket, config);
    });

    config.spans.forEach((span) => {
      const toGather = { ...span, os: [], responses: [] };
      const interval = setInterval(() => gatherOsMetrics(io, toGather), span.interval * 1000);

      interval.unref();
    });
  }
};
