import fs from 'fs';
import path from 'path';
import { validate } from './helpers/validate';
import { ChartVisibility, ExpressStatusConfig } from './types/config';
import Handlebars from 'handlebars';
import { Request, Response, NextFunction } from 'express';
import { SocketRequest } from './types/request';
import onHeaders from 'on-headers';
import { socketIoInit } from './helpers/socket-init';
import { healthChecker } from './helpers/health-checker';
import { onHeadersListener } from './helpers/on-headers-listener';

const middlewareWrapper = (config?: ExpressStatusConfig) => {
  const validatedConfig = validate(config);
  const bodyClasses = Object.keys(validatedConfig.chartVisibility)
    .reduce((accumulator: string[], key) => {
      if (validatedConfig.chartVisibility[key as keyof ChartVisibility] === false) {
        accumulator.push(`hide-${key}`);
      }
      return accumulator;
    }, [])
    .join(' ');

  const data = {
    title: validatedConfig.title,
    port: validatedConfig.port,
    socketPath: validatedConfig.socketPath,
    bodyClasses,
    script: fs.readFileSync(path.join(__dirname, '../../../public/javascripts/app.js')),
    style: fs.readFileSync(path.join(__dirname, '../../../public/stylesheets/', validatedConfig.theme)),
  };

  const htmlTmpl = fs.readFileSync(path.join(__dirname, '/public/index.html')).toString();

  const render = Handlebars.compile(htmlTmpl);

  const middleware = (socketRequest: Request, res: Response, next: NextFunction) => {
    const req = socketRequest as SocketRequest;
    socketIoInit(req.socket.server, validatedConfig);
    const startTime = process.hrtime();

    if (req.path === validatedConfig.path) {
      healthChecker(validatedConfig.healthChecks).then((results) => {
        res.send(render({ ...data, healthCheckResults: results }));
      });
    } else {
      if (!req.path.startsWith(validatedConfig.ignoreStartsWith)) {
        onHeaders(res, () => {
          onHeadersListener(res.statusCode, startTime, validatedConfig.spans);
        });
      }

      next();
    }
  };
  middleware.middleware = middleware;
  middleware.pageRoute = (_req: Request, res: Response) => {
    healthChecker(validatedConfig.healthChecks).then((results) => {
      res.send(render({ ...data, healthCheckResults: results }));
    });
  };
  return middleware;
};

export default middlewareWrapper;