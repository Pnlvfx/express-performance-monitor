import pidusage from 'pidusage';
import { RetentionSpan } from './config';
import v8 from 'node:v8';
import { EventLoopStats } from 'event-loop-stats';

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
