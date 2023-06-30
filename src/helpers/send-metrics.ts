/* eslint-disable unicorn/prefer-at */
import { Server } from 'socket.io';
import { OsMetrics } from '../types/os-metrics';

export const sendMetrics = (io: Server, span: OsMetrics) => {
  io.emit('esm_stats', {
    os: span.os[span.os.length - 2],
    responses: span.responses[span.responses.length - 2],
    interval: span.interval,
    retention: span.retention,
  });
};
