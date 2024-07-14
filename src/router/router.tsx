import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { ROUTES } from './routes';

import { HomePage } from '../pages/home/homePage';
import { ErrorPage } from '../pages/errorPage/errorPage';
import { ProductDetails } from '../components/productDetails/productDetails';
import { productDetailsLoader } from './loaders';

const routes: RouteObject[] = [
  {
    path: ROUTES.HOME,
    element: <HomePage />,
    errorElement: <ErrorPage />,

    children: [
      {
        path: `${ROUTES.PRODUCT}/:productId`,
        loader: productDetailsLoader,
        element: <ProductDetails />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };