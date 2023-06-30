import middlewareWrapper from '../src/index';
describe('middlewareWrapper', () => {
  test('returns a middleware function', () => {
    const middleware = middlewareWrapper();
    expect(typeof middleware).toBe('function');
  });
});
