import { Server } from 'socket.io';
export interface ValidExpressStatusConfig {
  title: string;
  theme: string;
  path: string;
  socketPath: string;
  websocket: Server | null;
  spans: RetentionSpan[];
  port: number | null;
  chartVisibility: ChartVisibility;
  healthChecks: HealthCheck[];
  ignoreStartsWith: string;
}

export type ExpressStatusConfig = Partial<ValidExpressStatusConfig>;

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
