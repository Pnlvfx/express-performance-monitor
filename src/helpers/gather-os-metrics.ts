import type { EventLoopStats } from '../types/event-loop-stats.js';
import type { OsMetrics } from '../types/os-metrics.js';
import pidusage from 'pidusage';
import _debug from 'debug';
import os from 'node:os';
import v8 from 'node:v8';
import { Server } from 'socket.io';
import { sendMetrics } from './send-metrics.js';

interface EventLoop {
  sense: () => EventLoopStats;
}

const debug = _debug('express-performance-monitor');
let eventLoopStats: EventLoop;

try {
  // eslint-disable-next-line unicorn/prefer-module
  eventLoopStats = require('event-loop-stats');
} catch (err) {
  console.warn('Ignoring event loop metrics...', err);
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

export const gatherOsMetrics = (io: Server, span: OsMetrics) => {
  pidusage(process.pid, (err, stats) => {
    if (err) {
      debug(err);
      return;
    }

    const last = span.responses.at(-1);

    const memory = stats.memory / 1024 / 1024;
    const load = os.loadavg();
    const timestamp = Date.now();
    const heap = v8.getHeapStatistics();

    let loop: EventLoopStats | undefined;

    if (eventLoopStats) {
      loop = eventLoopStats.sense();
    }

    span.os.push({ ...stats, memory, load, timestamp, heap, loop });
    if (last && (!span.responses[0] || (last.timestamp + span.interval) * 1000 < Date.now())) {
      span.responses.push(defaultResponse);
    }

    if (span.os.length >= span.retention) span.os.shift();
    if (span.responses[0] && span.responses.length > span.retention) span.responses.shift();

    sendMetrics(io, span);
  });
};
