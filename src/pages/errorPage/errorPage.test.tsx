import { RouteObject } from 'react-router-dom';

import { screen } from '@testing-library/dom';
import { ErrorPage } from './errorPage';
import { renderWithRouter } from '../../tests/helpers/renderWithRouter';
import { routes } from '../../router/router';

it('Should opens a detailed card component', async () => {
  const routerObject: RouteObject = {
    element: <ErrorPage />,
    path: '/',
  };
  renderWithRouter(routerObject, '/', routes);

  expect(screen.queryByTestId('error-message')).toBeInTheDocument();
});
