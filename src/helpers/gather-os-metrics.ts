import pidusage from 'pidusage';
import _debug from 'debug';
import os from 'os';
import v8 from 'v8';
import { Server } from 'socket.io';
import { sendMetrics } from './send-metrics';
const debug = _debug('express-performance-monitor');
let eventLoopStats: any;

try {
  eventLoopStats = require('event-loop-stats');
} catch (err) {
  console.warn('event-loop-stats not found, ignoring event loop metrics...');
}

const defaultResponse = {
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  count: 0,
  mean: 0,
  timestamp: Date.now(),
};

export const gatherOsMetrics = (io: Server, span: any) => {
  // RetentionSpan[]
  pidusage(process.pid, (err, stats) => {
    if (err) {
      debug(err);
      return;
    }

    const last = span.responses[span.responses.length - 1];

    const memory = stats.memory / 1024 / 1024;
    const load = os.loadavg();
    const timestamp = Date.now();
    const heap = v8.getHeapStatistics();

    let loop: any;

    if (eventLoopStats) {
      loop = eventLoopStats.sense();
    }

    span.os.push({ ...stats, memory, load, timestamp, heap, loop });
    if (!span.responses[0] || (last.timestamp + span.interval) * 1000 < Date.now()) {
      span.responses.push(defaultResponse);
    }

    if (span.os.length >= span.retention) span.os.shift();
    if (span.responses[0] && span.responses.length > span.retention) span.responses.shift();

    console.log({ memory });
    sendMetrics(io, span);
  });
};
