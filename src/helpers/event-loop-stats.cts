import type { EventLoopStats } from 'event-loop-stats';

/* eslint-disable unicorn/prefer-module */
interface EventLoop {
  sense: () => EventLoopStats;
}

export const getEventLoopStats = () => {
  let eventLoopStats: EventLoop | undefined;

  try {
    eventLoopStats = require('event-loop-stats');
    return eventLoopStats;
  } catch (err) {
    console.warn('Ignoring event loop metrics...', err);
    return;
  }
};
