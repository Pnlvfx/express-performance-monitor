import type { HealthCheck } from '../types/config.js';

interface CheckResult {
  status: string;
  path: string;
}

const allSettled = (promises: Promise<Response>[]) => {
  const wrappedPromises = promises.map((p) =>
    Promise.resolve(p).then(
      (value) => ({ state: 'fulfilled', value }),
      (err) => ({ state: 'rejected', reason: err }),
    ),
  );

  return Promise.all(wrappedPromises);
};

export const healthChecker = async (healthChecks: HealthCheck[]) => {
  const checkPromises: Promise<Response>[] = [];
  for (const healthCheck of healthChecks) {
    let uri = `${healthCheck.protocol}://${healthCheck.host}`;

    if (healthCheck.port) {
      uri += `:${healthCheck.port}`;
    }

    uri += healthCheck.path;

    checkPromises.push(
      fetch(uri, {
        method: 'GET',
      }),
    );
  }

  const checkResults: CheckResult[] = [];

  return allSettled(checkPromises).then((results) => {
    for (const [i, result] of results.entries()) {
      const healthCheck = healthChecks.at(i);
      if (!healthCheck) continue;
      if (result.state === 'rejected') {
        checkResults.push({
          path: healthCheck.path,
          status: 'failed',
        });
      } else {
        checkResults.push({
          path: healthCheck.path,
          status: 'ok',
        });
      }
    }

    return checkResults;
  });
};
