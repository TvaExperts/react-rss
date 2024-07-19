// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';
import { server } from './server/server';

beforeAll(() =>
  server.listen({
    onUnhandledRequest: 'error',
  })
);

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
