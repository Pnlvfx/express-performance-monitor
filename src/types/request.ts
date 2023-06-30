import type { Request } from 'express';
import http from 'node:http';
export type ExpressServer = http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

export interface SocketRequest extends Request {
  socket: Request['socket'] & { server: ExpressServer };
}
