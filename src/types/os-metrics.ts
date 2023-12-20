import type { RetentionSpan } from './config.js';
import type { EventLoopStats } from '../types/event-loop-stats.js';
import pidusage from 'pidusage';
import v8 from 'node:v8';

export interface OsMetrics extends RetentionSpan {
  os: OsMetricsOS[];
  responses: OsMetricsResponse[];
}

export interface OsMetricsOS extends pidusage.Status {
  load: number[];
  heap: v8.HeapInfo;
  loop?: EventLoopStats;
}

export interface OsMetricsResponse {
  timestamp: number;
}
