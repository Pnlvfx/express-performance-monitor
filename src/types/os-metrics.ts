import { EventLoopStats } from 'event-loop-stats';
import { RetentionSpan } from './config';
import pidusage from 'pidusage';
import v8 from 'v8';

export interface OsMetrics extends RetentionSpan {
  os: OsMetricsOs[];
  responses: OsMetricsResponse[];
}

export interface OsMetricsOs extends pidusage.Status {
  load: number[];
  heap: v8.HeapInfo;
  loop?: EventLoopStats;
}

interface OsMetricsResponse {
  timestamp: number;
}
