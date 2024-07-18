import type { EventLoopStats } from 'event-loop-stats';
interface EventLoop {
  sense: () => EventLoopStats;
}

export const getEventLoopStats = () => {
  let eventLoopStats: EventLoop | undefined;

  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports, unicorn/prefer-module
    eventLoopStats = require('event-loop-stats');
    return eventLoopStats;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('Ignoring event loop metrics...', err);
    return;
  }
};
