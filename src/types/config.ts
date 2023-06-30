import { Server } from 'socket.io';
import { OsMetrics } from './os-metrics';
export interface ValidExpressStatusConfig {
  title: string;
  theme: string;
  path: string;
  socketPath: string;
  websocket: Server | null;
  spans: OsMetrics[];
  port: number | null;
  chartVisibility: ChartVisibility;
  healthChecks: HealthCheck[];
  ignoreStartsWith: string;
}

type OmittedConfig = Omit<ValidExpressStatusConfig, 'spans'> & { spans: RetentionSpan[] };

export type ExpressStatusConfig = Partial<OmittedConfig>;

export type InitialStatusConfig = Omit<ValidExpressStatusConfig, 'spans'> & { spans: RetentionSpan[] };

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
