import { ChartVisibility, ExpressStatusConfig, InitialStatusConfig } from '../types/config';
import { defaultConfig } from './default-config';

const mungeChartVisibility = (configChartVisibility: ChartVisibility) => {
  for (const key of Object.keys(defaultConfig.chartVisibility)) {
    if (configChartVisibility[key as keyof ChartVisibility] === false) {
      defaultConfig.chartVisibility[key as keyof ChartVisibility] = false;
    }
  }
  return defaultConfig.chartVisibility;
};

export const validate = (config?: ExpressStatusConfig): InitialStatusConfig => {
  return {
    title: config?.title || defaultConfig.title,
    theme: config?.theme || defaultConfig.theme,
    path: config?.path || defaultConfig.path,
    socketPath: config?.socketPath || defaultConfig.socketPath,
    spans: config?.spans || defaultConfig.spans,
    port: config?.port || defaultConfig.port,
    websocket: config?.websocket || defaultConfig.websocket,
    chartVisibility: config?.chartVisibility ? mungeChartVisibility(config.chartVisibility) : mungeChartVisibility(defaultConfig.chartVisibility),
    ignoreStartsWith: config?.ignoreStartsWith || defaultConfig.ignoreStartsWith,
    healthChecks: config?.healthChecks && Array.isArray(config.healthChecks) ? config?.healthChecks : defaultConfig.healthChecks,
  };
};
