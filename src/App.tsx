import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import './global.css';

export function App() {
  return <RouterProvider router={router} />;
}
