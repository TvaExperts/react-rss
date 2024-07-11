import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import { Fallback } from '../components/fallback/fallback';
import { RootLayout } from '../components/rootLayout/rootLayout';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    errorElement: <Fallback />,

    // children: [
    //   {
    //     path: `${ROUTES.PRODUCT}/:productId`,
    //     element: <ProductCard />,
    //   },
    // ],
  },
]);

export { router };
