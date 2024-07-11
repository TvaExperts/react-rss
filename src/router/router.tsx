import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';

import { HomePage } from '../pages/home/homePage';
import { NotFoundPage } from '../pages/404/notFoundPage';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
    errorElement: <NotFoundPage />,

    // children: [
    //   {
    //     path: `${ROUTES.PRODUCT}/:productId`,
    //     element: <ProductCard />,
    //   },
    // ],
  },
]);

export { router };
