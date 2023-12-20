import type { Server } from 'socket.io';
import type { OsMetrics } from '../types/os-metrics.js';

export const sendMetrics = (io: Server, span: OsMetrics) => {
  io.emit('esm_stats', {
    os: span.os.at(-2),
    responses: span.responses.at(-2),
    interval: span.interval,
    retention: span.retention,
  });
};
