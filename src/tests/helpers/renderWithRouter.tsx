// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';
import {
  RouterProvider,
  createMemoryRouter,
  RouteObject,
} from 'react-router-dom';

export function renderWithRouter(
  routeObject: RouteObject | null,
  path: string = '/',
  routes: RouteObject[] = []
) {
  const allRoutes = routeObject ? [routeObject, ...routes] : [...routes];

  const router = createMemoryRouter(allRoutes, {
    initialEntries: [path],
  });

  return render(<RouterProvider router={router} />);
}
