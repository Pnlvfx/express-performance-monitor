import { HealthCheck } from '../types/config';

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
  healthChecks.forEach((healthCheck) => {
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
  });

  const checkResults: CheckResult[] = [];

  return allSettled(checkPromises).then((results) => {
    results.forEach((result, index) => {
      if (result.state === 'rejected') {
        checkResults.push({
          path: healthChecks[index].path,
          status: 'failed',
        });
      } else {
        checkResults.push({
          path: healthChecks[index].path,
          status: 'ok',
        });
      }
    });

    return checkResults;
  });
};
