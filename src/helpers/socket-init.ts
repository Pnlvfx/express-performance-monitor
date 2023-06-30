import { Server, Socket } from 'socket.io';
import { InitialStatusConfig, ValidExpressStatusConfig } from '../types/config';
import { ExpressServer } from '../types/request';
import { gatherOsMetrics } from './gather-os-metrics';
import { OsMetrics } from '../types/os-metrics';
let io: Server;

const addSocketEvents = (socket: Socket, config: ValidExpressStatusConfig) => {
  socket.emit('esm_start', config.spans);
  socket.on('esm_change', () => {
    socket.emit('esm_start', config.spans);
  });
};

export const socketIoInit = (server: ExpressServer, config: InitialStatusConfig) => {
  if (io === undefined || io === null) {
    io = config.websocket || new Server(server);

    io.on('connection', (socket: Socket) => {
      addSocketEvents(socket, config as ValidExpressStatusConfig);
    });

    for (const span of config.spans) {
      span.os = [];
      span.responses = [];
      const interval = setInterval(() => {
        if (!span.os) return;
        gatherOsMetrics(io, span as OsMetrics);
      }, span.interval * 1000);

      interval.unref();
    }
  }
};
