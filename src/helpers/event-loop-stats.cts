/* eslint-disable unicorn/prefer-module */
let eventLoopStats;

try {
  eventLoopStats = require('event-loop-stats');
} catch (err) {
  console.warn('Ignoring event loop metrics...', err);
  eventLoopStats = {};
}

module.exports = eventLoopStats;
