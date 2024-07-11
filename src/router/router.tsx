import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';

import { HomePage } from '../pages/home/homePage';
import { ErrorPagePage } from '../pages/errorPage/errorPagePage';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
    errorElement: <ErrorPagePage />,

    // children: [
    //   {
    //     path: `${ROUTES.PRODUCT}/:productId`,
    //     element: <ProductCard />,
    //   },
    // ],
  },
]);

export { router };
