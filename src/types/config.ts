import { Server } from 'socket.io';
import type { OsMetrics } from './os-metrics.js';
export interface ValidExpressStatusConfig {
  title: string;
  theme: string;
  path: string;
  socketPath: string;
  websocket?: Server;
  spans: OsMetrics[];
  port?: number;
  chartVisibility: ChartVisibility;
  healthChecks: HealthCheck[];
  ignoreStartsWith: string;
}

type OmittedConfig = Omit<ValidExpressStatusConfig, 'spans'> & { spans: RetentionSpan[] };

export type ExpressStatusConfig = Partial<OmittedConfig>;

type PartialSpan = Omit<OsMetrics, 'interval' | 'retention'>;

export type InitialStatusConfig = Omit<ValidExpressStatusConfig, 'spans'> & { spans: Partial<PartialSpan>[] & RetentionSpan[] };

export interface ChartVisibility {
  cpu?: boolean;
  mem?: boolean;
  load?: boolean;
  /** @default true */
  eventLoop?: boolean;
  heap?: boolean;
  responseTime?: boolean;
  rps?: boolean;
  statusCodes?: boolean;
}

export interface RetentionSpan {
  interval: number;
  retention: number;
}

export interface HealthCheck {
  protocol: string;
  host: string;
  path: string;
  port: string | number;
}
